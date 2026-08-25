import { describe, expect, it } from "vitest";
import { EXERCISES, filterExercises, MAYAMALAVAGOWLA } from "./catalog";
import { beatDurationMs, frequencyForSwara } from "./music";
import { selectNearestSample } from "../audio/SampledTonePlayer";

describe("exercise catalog", () => {
  it("contains unique, non-empty exercises tied to the known scale", () => {
    expect(new Set(EXERCISES.map((exercise) => exercise.id)).size).toBe(EXERCISES.length);
    for (const exercise of EXERCISES) {
      expect(exercise.sequence.length).toBeGreaterThan(0);
      expect(exercise.scaleId).toBe(MAYAMALAVAGOWLA.id);
    }
  });

  it("filters exercises without mutating the catalog", () => {
    const sarali = filterExercises("Sarali");
    expect(sarali.length).toBeGreaterThan(0);
    expect(sarali.every((exercise) => exercise.category === "Sarali")).toBe(true);
    expect(filterExercises("All")).toBe(EXERCISES);
  });
});

describe("sample selection", () => {
  const samples = [
    { url: "/C4.wav", frequencyHz: 261.63 },
    { url: "/G4.wav", frequencyHz: 392 },
    { url: "/C5.wav", frequencyHz: 523.25 },
  ] as const;

  it("selects the nearest pitch anchor on a logarithmic scale", () => {
    expect(selectNearestSample(samples, 440).url).toBe("/G4.wav");
    expect(selectNearestSample(samples, 520).url).toBe("/C5.wav");
  });

  it("rejects an empty sample manifest", () => {
    expect(() => selectNearestSample([], 440)).toThrow("at least one sample");
  });
});

describe("music calculations", () => {
  it("maps upper Sa to exactly one octave above the tonic", () => {
    expect(frequencyForSwara("Ṡ", 261.63)).toBeCloseTo(523.26, 5);
  });

  it("uses the Mayamalavagowla R1 interval", () => {
    expect(frequencyForSwara("R₁", 261.63)).toBeCloseTo(261.63 * 2 ** (1 / 12), 5);
  });

  it("converts tempo into beat duration and rejects invalid values", () => {
    expect(beatDurationMs(120)).toBe(500);
    expect(() => beatDurationMs(0)).toThrow(RangeError);
    expect(() => frequencyForSwara("S", -1)).toThrow(RangeError);
  });
});
