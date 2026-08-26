import { MAYAMALAVAGOWLA } from "./catalog";
import type { ScaleDefinition, Swara } from "./types";

export type TraditionalSpeed = 1 | 2 | 3;

export const TRADITIONAL_SPEEDS: readonly TraditionalSpeed[] = [1, 2, 3];
export const TALA_BEAT_DURATION_MS = 1_000;

export function frequencyForSwara(swara: Swara, tonicHz: number, scale: ScaleDefinition = MAYAMALAVAGOWLA): number {
  if (!Number.isFinite(tonicHz) || tonicHz <= 0) throw new RangeError("Tonic frequency must be positive");
  const semitones = scale.semitones[swara];
  if (semitones === undefined) throw new RangeError(`${swara} is not part of ${scale.name}`);
  return tonicHz * 2 ** (semitones / 12);
}

export function beatDurationMs(bpm: number): number {
  if (!Number.isFinite(bpm) || bpm <= 0) throw new RangeError("Tempo must be positive");
  return 60_000 / bpm;
}

export function swaraDurationMs(speed: TraditionalSpeed): number {
  if (!TRADITIONAL_SPEEDS.includes(speed)) throw new RangeError("Traditional speed must be first, second, or third");
  return TALA_BEAT_DURATION_MS / 2 ** (speed - 1);
}
