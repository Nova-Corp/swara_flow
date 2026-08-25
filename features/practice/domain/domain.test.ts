import { describe, expect, it } from "vitest";
import { adaptExerciseToRaga, DEFAULT_EXERCISE_FILTER, EXERCISES, filterExercises, getExerciseById, HARIKAMBHOJI, MAYAMALAVAGOWLA, RAGAS } from "./catalog";
import { beatDurationMs, frequencyForSwara } from "./music";
import { selectNearestSample } from "../audio/SampledTonePlayer";
import { splitPyramidRows } from "../components/ExerciseNotation";

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

  it("preserves the verified Sarali Varisai 1 notation", () => {
    expect(EXERCISES.find((exercise) => exercise.id === "sarali-1")?.sequence).toEqual([
      "S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ",
      "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S",
    ]);
  });

  it("preserves the complete verified Sarali Varisai 2 notation", () => {
    expect(EXERCISES.find((exercise) => exercise.id === "sarali-2")?.sequence).toEqual([
      "S", "R₁", "S", "R₁", "S", "R₁", "G₃", "M₁",
      "S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ",
      "Ṡ", "N₃", "Ṡ", "N₃", "Ṡ", "N₃", "D₁", "P",
      "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S",
    ]);
  });

  it("contains the complete verified 14-exercise Sarali curriculum", () => {
    const sarali = filterExercises("Sarali");
    expect(sarali).toHaveLength(14);
    expect(sarali.map((exercise) => exercise.id)).toEqual(Array.from({ length: 14 }, (_, index) => `sarali-${index + 1}`));
    expect(sarali.every((exercise) => exercise.status === "verified")).toBe(true);
  });

  it("preserves the canonical eight-beat phrases and sustained beats", () => {
    const symbol = { S: "s", "R₁": "r", "R₂": "r", "G₃": "g", "M₁": "m", P: "p", "D₁": "d", "D₂": "d", "N₂": "n", "N₃": "n", "Ṡ": "S" } as const;
    const expected = [
      "srgmpdnS Sndpmgrs",
      "srsrsrgm srgmpdnS SnSnSndp Sndpmgrs",
      "srgsrgsr srgmpdnS SndSndSn Sndpmgrs",
      "srgmsrgm srgmpdnS SndpSndp Sndpmgrs",
      "srgmp-sr srgmpdnS Sndpm-Sn Sndpmgrs",
      "srgmpdsr srgmpdnS SndpmgSn Sndpmgrs",
      "srgmpdn- srgmpdnS Sndpmgr- Sndpmgrs",
      "srgmpmgr srgmpdnS Sndpmpdn Sndpmgrs",
      "srgmpmdp srgmpdnS Sndpmpgm Sndpmgrs",
      "srgmp-gm p---p--- gmpdndpm gmpgmgrs",
      "S-ndn-dp d-pmp-p- gmpdndpm gmpgmgrs",
      "SSndnndp ddpmp-p- gmpdndpm gmpgmgrs",
      "srgrg-gm pmp-dpd- mpdpdndp mpdpmgrs",
      "srgmp-p- ddp-mmp- dnS-Sndp Sndpmgrs",
    ];

    expect(expected.map((_, exerciseIndex) => {
      const exercise = getExerciseById(`sarali-${exerciseIndex + 1}`);
      const sustained = new Set(exercise.sustainAt);
      return exercise.sequence
        .map((swara, index) => sustained.has(index) ? "-" : symbol[swara])
        .reduce((notation, token, index) => notation + (index > 0 && index % 8 === 0 ? ` ${token}` : token), "");
    })).toEqual(expected);
  });

  it("defaults the library to Sarali Varisai", () => {
    expect(DEFAULT_EXERCISE_FILTER).toBe("Sarali");
    expect(filterExercises(DEFAULT_EXERCISE_FILTER)).toHaveLength(14);
  });

  it("adapts Sarali patterns to Harikambhoji without duplicating the curriculum", () => {
    expect(RAGAS.map((raga) => raga.name)).toEqual(["Mayamalavagowla", "Harikambhoji"]);
    expect(HARIKAMBHOJI.ascending).toEqual(["S", "R₂", "G₃", "M₁", "P", "D₂", "N₂", "Ṡ"]);
    expect(adaptExerciseToRaga(getExerciseById("sarali-1"), HARIKAMBHOJI).sequence).toEqual([
      "S", "R₂", "G₃", "M₁", "P", "D₂", "N₂", "Ṡ",
      "Ṡ", "N₂", "D₂", "P", "M₁", "G₃", "R₂", "S",
    ]);
  });

  it("provides five progressive pyramid exercises", () => {
    const pyramids = filterExercises("Pyramid");
    expect(pyramids).toHaveLength(5);
    expect(pyramids.map((exercise) => exercise.title)).toEqual([
      "Pyramid to Ma", "Pyramid to Pa", "Pyramid to Dha", "Pyramid to Ni", "Full-octave pyramid",
    ]);

    const pyramid = EXERCISES.find((exercise) => exercise.id === "pyramid-1");
    expect(pyramid).toBeDefined();
    expect(pyramid?.visualization).toEqual({ kind: "pyramid", rows: [1, 3, 5, 7] });
    expect(splitPyramidRows(pyramid!).map((row) => row.map((note) => note.swara))).toEqual([
      ["S"],
      ["S", "R₁", "S"],
      ["S", "R₁", "G₃", "R₁", "S"],
      ["S", "R₁", "G₃", "M₁", "G₃", "R₁", "S"],
    ]);

    const fullOctave = getExerciseById("pyramid-5");
    expect(fullOctave.visualization).toEqual({ kind: "pyramid", rows: [1, 3, 5, 7, 9, 11, 13, 15] });
    expect(splitPyramidRows(fullOctave).at(-1)?.map((note) => note.swara)).toEqual([
      "S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S",
    ]);
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

  it("uses Harikambhoji R2, D2 and N2 intervals", () => {
    expect(frequencyForSwara("R₂", 261.63, HARIKAMBHOJI)).toBeCloseTo(261.63 * 2 ** (2 / 12), 5);
    expect(frequencyForSwara("D₂", 261.63, HARIKAMBHOJI)).toBeCloseTo(261.63 * 2 ** (9 / 12), 5);
    expect(frequencyForSwara("N₂", 261.63, HARIKAMBHOJI)).toBeCloseTo(261.63 * 2 ** (10 / 12), 5);
  });

  it("converts tempo into beat duration and rejects invalid values", () => {
    expect(beatDurationMs(120)).toBe(500);
    expect(() => beatDurationMs(0)).toThrow(RangeError);
    expect(() => frequencyForSwara("S", -1)).toThrow(RangeError);
  });
});
