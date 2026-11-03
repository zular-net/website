import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { chargeCrystal, EdgeArcs } from './energy.js';

const VIOLET = '#7A5CFF';
const VEIN = '#E4DCFF';
const LOAD_TIMEOUT_MS = 15000;

async function fetchModel(url) {
  if (url.startsWith('data:')) {
    return Uint8Array.from(atob(url.split(',')[1]), (c) => c.charCodeAt(0)).buffer;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LOAD_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Model request failed with ${response.status}`);
    return await response.arrayBuffer();
  } finally {
    clearTimeout(timer);
  }
}

// The real brand model, drawn into one fixed canvas and flown between anchors on the page.
export class BoltScene {
  constructor({ canvas, getAnchors, reducedMotion, onContextLost }) {
    this.canvas = canvas;
    this.getAnchors = getAnchors;
    this.reducedMotion = reducedMotion;
    this.onContextLost = onContextLost;
    this.effects = [];
    this.position = new THREE.Vector3();
    this.target = new THREE.Vector3();
    this.scale = 0;
    this.targetScale = 1;
    this.placed = false;
    this.stopped = false;
    this.lastTime = 0;
    this.pointer = { x: 0, y: 0 };

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setSize(innerWidth, innerHeight, false);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.82;

    this.scene = new THREE.Scene();
    this.pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = this.pmrem.fromScene(new RoomEnvironment(), 0.02).texture;
    this.scene.environmentIntensity = 0.42;

    this.camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, 5.2);

    const key = new THREE.DirectionalLight(0xd8ccff, 1.6);
    key.position.set(2, 3, 4);
    const rim = new THREE.PointLight(0x7a5cff, 6, 10);
    rim.position.set(-2, -1, 1.5);
    this.scene.add(key, rim);

    this.holder = new THREE.Group();
    this.scene.add(this.holder);
    this.clock = new THREE.Clock();

    this.frame = this.frame.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handlePointer = this.handlePointer.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
    this.handleContextLost = this.handleContextLost.bind(this);
  }

  async load(url) {
    const data = await fetchModel(url);
    const gltf = await new GLTFLoader().parseAsync(data, '');
    const model = gltf.scene;
    const bolt = model.getObjectByName('Bolt');
    if (!bolt) throw new Error('Model has no Bolt mesh');
    this.effects.push(chargeCrystal(bolt, { color: VIOLET, veinColor: VEIN }));
    if (!this.reducedMotion && bolt.userData.outline) {
      const arcs = new EdgeArcs(bolt.userData.outline, { color: VEIN, rate: 1.2, max: 2 });
      bolt.add(arcs.group);
      this.effects.push(arcs);
    }
    const box = new THREE.Box3().setFromObject(model);
    this.modelHeight = box.getSize(new THREE.Vector3()).y;
    model.position.sub(box.getCenter(new THREE.Vector3()));
    this.holder.add(model);
  }

  start() {
    addEventListener('resize', this.handleResize);
    addEventListener('pointermove', this.handlePointer, { passive: true });
    document.addEventListener('visibilitychange', this.handleVisibility);
    this.canvas.addEventListener('webglcontextlost', this.handleContextLost);
    if (this.reducedMotion) {
      addEventListener('scroll', this.frame, { passive: true });
      this.frame();
    } else {
      this.renderer.setAnimationLoop(this.frame);
    }
  }

  // Aims at the anchor closest to the middle of the screen.
  pickTarget() {
    const middle = innerHeight / 2;
    let best = null;
    let bestDistance = Infinity;
    for (const anchor of this.getAnchors()) {
      const box = anchor.getBoundingClientRect();
      const distance = Math.abs(box.top + box.height / 2 - middle);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = box;
      }
    }
    if (!best) return;
    const viewHeight = 2 * this.camera.position.z * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    const unit = viewHeight / innerHeight;
    this.target.set(
      (best.left + best.width / 2 - innerWidth / 2) * unit,
      -(best.top + best.height / 2 - innerHeight / 2) * unit,
      0,
    );
    this.targetScale = (best.height * unit) / this.modelHeight;
  }

  // A failed or lost graphics context stops the bolt, and the flat logos take over.
  frame() {
    if (this.stopped) return;
    if (this.renderer.getContext().isContextLost()) {
      this.fail();
      return;
    }
    try {
      this.draw();
    } catch {
      this.fail();
    }
  }

  fail() {
    this.stopped = true;
    this.renderer.setAnimationLoop(null);
    this.onContextLost?.();
  }

  draw() {
    const time = this.clock.getElapsedTime();
    const delta = Math.min(0.05, time - this.lastTime);
    this.lastTime = time;
    this.pickTarget();
    const ease = this.reducedMotion || !this.placed ? 1 : 1 - Math.exp(-delta * 9);
    this.position.lerp(this.target, ease);
    this.scale += (this.targetScale - this.scale) * ease;
    this.placed = true;
    this.holder.position.copy(this.position);
    this.holder.scale.setScalar(this.scale);
    const sway = this.reducedMotion ? 0 : Math.sin(time * 0.55) * 0.42;
    const nod = this.reducedMotion ? 0 : Math.cos(time * 0.4) * 0.08;
    this.holder.rotation.y = sway + this.pointer.x * 0.7;
    this.holder.rotation.x = nod + this.pointer.y * 0.45;
    for (const effect of this.effects) effect.update(time);
    this.renderer.render(this.scene, this.camera);
  }

  handleResize() {
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(innerWidth, innerHeight, false);
    this.frame();
  }

  handlePointer(event) {
    this.pointer.x = event.clientX / innerWidth - 0.5;
    this.pointer.y = event.clientY / innerHeight - 0.5;
  }

  handleVisibility() {
    if (this.reducedMotion || this.stopped) return;
    this.renderer.setAnimationLoop(document.hidden ? null : this.frame);
  }

  handleContextLost(event) {
    event.preventDefault();
    this.fail();
  }

  dispose() {
    this.stopped = true;
    this.renderer.setAnimationLoop(null);
    removeEventListener('resize', this.handleResize);
    removeEventListener('pointermove', this.handlePointer);
    removeEventListener('scroll', this.frame);
    document.removeEventListener('visibilitychange', this.handleVisibility);
    this.canvas.removeEventListener('webglcontextlost', this.handleContextLost);
    this.holder.traverse((node) => {
      node.geometry?.dispose();
      node.material?.dispose();
    });
    this.scene.environment?.dispose();
    this.pmrem.dispose();
    this.renderer.dispose();
  }
}
