import { MAYAMALAVAGOWLA } from "./catalog";
import type { ScaleDefinition, Swara } from "./types";

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
