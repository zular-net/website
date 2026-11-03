import type { Group, Mesh } from 'three';

export interface Effect {
  update(time: number): void;
}

export function chargeCrystal(
  mesh: Mesh,
  options?: { color?: string; veinColor?: string; intensity?: number },
): Effect;

export function plasmafy(mesh: Mesh, options?: { color?: string; core?: string }): Effect;

export class EdgeArcs implements Effect {
  constructor(
    outline: number[][],
    options?: { color?: string; rate?: number; max?: number; [key: string]: unknown },
  );
  group: Group;
  update(time: number): void;
}
