import { MAYAMALAVAGOWLA } from "./catalog";
import { Swara } from "./types";

export function frequencyForSwara(swara: Swara, tonicHz: number): number {
  if (!Number.isFinite(tonicHz) || tonicHz <= 0) throw new RangeError("Tonic frequency must be positive");
  return tonicHz * 2 ** (MAYAMALAVAGOWLA.semitones[swara] / 12);
}

export function beatDurationMs(bpm: number): number {
  if (!Number.isFinite(bpm) || bpm <= 0) throw new RangeError("Tempo must be positive");
  return 60_000 / bpm;
}
