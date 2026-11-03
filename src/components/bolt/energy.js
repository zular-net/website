// Zular energy effects for three.js — reusable in any app that loads zular-bolt-v3*.glb
//   chargeCrystal(mesh, opts)  -> v3a: crystal with moving electric veins on its surface
//   plasmafy(mesh, opts)       -> v3b: white-hot plasma core, faceted, flickering
//   new EdgeArcs(outline, opts) -> small arcs crawling along the bolt's edge (outline from Bolt.userData.outline)
// Call update(time) on each every frame.
import * as THREE from 'three';

const NOISE = /* glsl */`
vec4 dPerm(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 dTaylor(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float dNoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g; vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx; vec3 x2 = x0 - i2 + 2.0*C.xxx; vec3 x3 = x0 - 1.0 + 3.0*C.xxx;
  i = mod(i, 289.0);
  vec4 p = dPerm(dPerm(dPerm(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0; vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z); vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy; vec4 y = y_ * ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0; vec4 s1 = floor(b1)*2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x); vec3 p1 = vec3(a0.zw, h.y); vec3 p2 = vec3(a1.xy, h.z); vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = dTaylor(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
// sparse, jagged, crackling "lightning veins": ridged noise on a jittered domain,
// re-seeded in steps so it flickers like discharge instead of flowing like water
float dVeins(vec3 p, float t){
  float st = floor(t * 9.0);
  vec3 q = p * 1.5 + vec3(st * 0.31, st * 0.17, t * 0.15);
  q += 0.10 * vec3(dNoise(p * 16.0 + st), dNoise(p * 16.0 + 11.0 + st), 0.0);   // jaggedness
  float strike = pow(1.0 - abs(dNoise(q)), 38.0);
  vec3 q2 = p * 3.2 + vec3(0.0, st * 0.53, 0.0);
  q2 += 0.06 * vec3(dNoise(p * 24.0 - st), dNoise(p * 24.0 + 5.0), 0.0);
  float branch = pow(1.0 - abs(dNoise(q2)), 55.0) * 0.6;
  float mask = smoothstep(-0.25, 0.3, dNoise(vec3(p.xy * 0.9, t * 0.6)));            // only a few strikes at once
  return (strike + branch) * mask;
}`;

export function chargeCrystal(mesh, { color = '#7A5CFF', veinColor = '#E4DCFF', intensity = 3.0 } = {}) {
  const uniforms = { uTime: { value: 0 }, uVein: { value: new THREE.Color(veinColor) }, uRim: { value: new THREE.Color(color) }, uIntensity: { value: intensity } };
  const mat = mesh.material;
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vObjPos;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvObjPos = position;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vObjPos;\nuniform float uTime; uniform vec3 uVein; uniform vec3 uRim; uniform float uIntensity;\n${NOISE}`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        float flick = 0.8 + 0.2 * sin(uTime * 23.0) * sin(uTime * 7.0);
        totalEmissiveRadiance += uVein * dVeins(vObjPos, uTime) * uIntensity * flick;
        float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 3.0);
        totalEmissiveRadiance += uRim * rim * 0.6;`);
  };
  mat.needsUpdate = true;
  return { update: (t) => { uniforms.uTime.value = t; } };
}

export function plasmafy(mesh, { color = '#7A5CFF', core = '#F4F0FF' } = {}) {
  const uniforms = { uTime: { value: 0 }, uColor: { value: new THREE.Color(color) }, uCore: { value: new THREE.Color(core) } };
  mesh.material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */`
      varying vec3 vObjPos; varying vec3 vViewPos;
      void main(){ vObjPos = position; vec4 mv = modelViewMatrix * vec4(position, 1.0); vViewPos = mv.xyz; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: /* glsl */`
      uniform float uTime; uniform vec3 uColor; uniform vec3 uCore;
      varying vec3 vObjPos; varying vec3 vViewPos;
      ${NOISE}
      void main(){
        vec3 n = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));      // flat facet normal
        float facing = abs(dot(n, normalize(-vViewPos)));
        float facet = 0.55 + 0.45 * fract(sin(dot(floor(n * 8.0), vec3(12.9898, 78.233, 37.719))) * 43758.5453);
        float flick = 0.9 + 0.1 * sin(uTime * 31.0) * sin(uTime * 11.0 + 1.3);
        float coreAmt = pow(facing, 3.0) * facet;
        vec3 col = mix(uColor * 0.6, uCore * 1.1, coreAmt) * flick;
        col += uCore * dVeins(vObjPos * 1.2, uTime * 1.3) * 1.6;
        col += uColor * pow(1.0 - facing, 2.5) * 0.6;                      // electric rim
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  return { update: (t) => { uniforms.uTime.value = t; } };
}

export class EdgeArcs {
  constructor(outline, { color = '#D9D0FF', rate = 2.2, max = 3, z = 0.03 } = {}) {
    this.pts = outline.map(([x, y]) => new THREE.Vector2(x, y));
    this.group = new THREE.Group();
    this.mat = new THREE.LineBasicMaterial({ color: new THREE.Color(color).multiplyScalar(3), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    this.arcs = []; this.rate = rate; this.max = max; this.z = z; this.last = 0;
  }
  _path(a, b, out) {
    // midpoint displacement between two outline points, pushed slightly off the surface
    const o = 0.012, z = this.z * (Math.random() < 0.5 ? 1 : -1);
    let pts = [new THREE.Vector3(a.x + out.x * o, a.y + out.y * o, z), new THREE.Vector3(b.x + out.x * o, b.y + out.y * o, z)];
    let amp = a.distanceTo(b) * 0.35;
    for (let k = 0; k < 4; k++) {
      const next = [pts[0]];
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i - 1], q = pts[i], m = p.clone().add(q).multiplyScalar(0.5);
        m.x += out.x * (Math.random() - 0.3) * amp; m.y += out.y * (Math.random() - 0.3) * amp; m.z += (Math.random() - 0.5) * amp;
        next.push(m, q);
      }
      pts = next; amp *= 0.55;
    }
    return pts;
  }
  update(t) {
    if (t - this.last > 1 / this.rate && this.arcs.length < this.max && Math.random() < 0.5) {
      this.last = t;
      const n = this.pts.length, i = Math.floor(Math.random() * n), span = 1 + Math.floor(Math.random() * 3);
      const a = this.pts[i], b = this.pts[(i + span) % n];
      const d = b.clone().sub(a); const out = new THREE.Vector2(d.y, -d.x).normalize();
      const line = new THREE.Line(new THREE.BufferGeometry(), this.mat.clone());
      line.userData = { a, b, out, born: t, life: 0.08 + Math.random() * 0.14 };
      line.renderOrder = 2;
      this.group.add(line); this.arcs.push(line);
    }
    for (const l of [...this.arcs]) {
      const { a, b, out, born, life } = l.userData, age = t - born;
      if (age > life) { this.group.remove(l); l.geometry.dispose(); l.material.dispose(); this.arcs.splice(this.arcs.indexOf(l), 1); continue; }
      l.geometry.setFromPoints(this._path(a, b, out));      // re-jag every frame = flicker
      l.material.opacity = 1 - age / life;
    }
  }
}
