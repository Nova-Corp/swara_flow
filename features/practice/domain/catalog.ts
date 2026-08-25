import { Exercise, ExerciseCategory, ScaleDefinition, SWARAS, TonicOption } from "./types";

export const MAYAMALAVAGOWLA: ScaleDefinition = {
  id: "mayamalavagowla",
  name: "Mayamalavagowla",
  ascending: ["S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ"],
  semitones: { S: 0, "R₁": 1, "G₃": 4, "M₁": 5, P: 7, "D₁": 8, "N₃": 11, "Ṡ": 12 },
};

export const HARIKAMBHOJI: ScaleDefinition = {
  id: "harikambhoji",
  name: "Harikambhoji",
  ascending: ["S", "R₂", "G₃", "M₁", "P", "D₂", "N₂", "Ṡ"],
  semitones: { S: 0, "R₂": 2, "G₃": 4, "M₁": 5, P: 7, "D₂": 9, "N₂": 10, "Ṡ": 12 },
};

export const RAGAS: readonly ScaleDefinition[] = [MAYAMALAVAGOWLA, HARIKAMBHOJI];

export const EXERCISE_CATEGORIES = ["All", "Sarali", "Janta", "Alankaram", "Pyramid"] as const;
export type ExerciseFilter = "All" | ExerciseCategory;
export const DEFAULT_EXERCISE_FILTER: ExerciseFilter = "Sarali";

export const TONIC_OPTIONS: readonly TonicOption[] = [
  { label: "C", hz: 261.63 }, { label: "C♯", hz: 277.18 },
  { label: "D", hz: 293.66 }, { label: "D♯", hz: 311.13 },
  { label: "E", hz: 329.63 }, { label: "F", hz: 349.23 },
  { label: "F♯", hz: 369.99 }, { label: "G", hz: 392 },
];

const definitions = [
  { id: "sarali-1", category: "Sarali", status: "verified", title: "Sarali Varisai 1", description: "Simple ascent and descent.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"] },
  { id: "sarali-2", category: "Sarali", status: "verified", title: "Sarali Varisai 2", description: "Focus on Ri ascending and Ni descending.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "S", "R₁", "S", "R₁", "G₃", "M₁", "S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ", "Ṡ", "N₃", "Ṡ", "N₃", "Ṡ", "N₃", "D₁", "P", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"] },
  { id: "sarali-3", category: "Sarali", status: "verified", title: "Sarali Varisai 3", description: "Focus on Ga ascending and Dha descending.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "G₃", "S", "R₁", "G₃", "S", "R₁", "S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ", "Ṡ", "N₃", "D₁", "Ṡ", "N₃", "D₁", "Ṡ", "N₃", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"] },
  { id: "sarali-4", category: "Sarali", status: "verified", title: "Sarali Varisai 4", description: "Focus on Ma ascending and Pa descending.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "G₃", "M₁", "S", "R₁", "G₃", "M₁", "S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ", "Ṡ", "N₃", "D₁", "P", "Ṡ", "N₃", "D₁", "P", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"] },
  { id: "sarali-5", category: "Sarali", status: "verified", title: "Sarali Varisai 5", description: "Sustained Pa and Ma phrases.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "G₃", "M₁", "P", "P", "S", "R₁", "S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ", "Ṡ", "N₃", "D₁", "P", "M₁", "M₁", "Ṡ", "N₃", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"], sustainAt: [5, 21] },
  { id: "sarali-6", category: "Sarali", status: "verified", title: "Sarali Varisai 6", description: "Ga and Dha phrase practice.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "G₃", "M₁", "P", "D₁", "S", "R₁", "S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "Ṡ", "N₃", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"] },
  { id: "sarali-7", category: "Sarali", status: "verified", title: "Sarali Varisai 7", description: "Sustained Ni and Ri phrases.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "N₃", "S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "R₁", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"], sustainAt: [7, 23] },
  { id: "sarali-8", category: "Sarali", status: "verified", title: "Sarali Varisai 8", description: "Zigzag Pa–Ma–Ga–Ri phrases.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "G₃", "M₁", "P", "M₁", "G₃", "R₁", "S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ", "Ṡ", "N₃", "D₁", "P", "M₁", "P", "D₁", "N₃", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"] },
  { id: "sarali-9", category: "Sarali", status: "verified", title: "Sarali Varisai 9", description: "Zigzag Pa–Ma–Dha–Pa phrases.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "G₃", "M₁", "P", "M₁", "D₁", "P", "S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ", "Ṡ", "N₃", "D₁", "P", "M₁", "P", "G₃", "M₁", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"] },
  { id: "sarali-10", category: "Sarali", status: "verified", title: "Sarali Varisai 10", description: "Long Pa and resting Ga phrases.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "G₃", "M₁", "P", "P", "G₃", "M₁", "P", "P", "P", "P", "P", "P", "P", "P", "G₃", "M₁", "P", "D₁", "N₃", "D₁", "P", "M₁", "G₃", "M₁", "P", "G₃", "M₁", "G₃", "R₁", "S"], sustainAt: [5, 9, 10, 11, 13, 14, 15] },
  { id: "sarali-11", category: "Sarali", status: "verified", title: "Sarali Varisai 11", description: "Sustained upper Sa, Ni, Dha and Pa.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["Ṡ", "Ṡ", "N₃", "D₁", "N₃", "N₃", "D₁", "P", "D₁", "D₁", "P", "M₁", "P", "P", "P", "P", "G₃", "M₁", "P", "D₁", "N₃", "D₁", "P", "M₁", "G₃", "M₁", "P", "G₃", "M₁", "G₃", "R₁", "S"], sustainAt: [1, 5, 9, 13, 15] },
  { id: "sarali-12", category: "Sarali", status: "verified", title: "Sarali Varisai 12", description: "Introduction to paired-note articulation.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["Ṡ", "Ṡ", "N₃", "D₁", "N₃", "N₃", "D₁", "P", "D₁", "D₁", "P", "M₁", "P", "P", "P", "P", "G₃", "M₁", "P", "D₁", "N₃", "D₁", "P", "M₁", "G₃", "M₁", "P", "G₃", "M₁", "G₃", "R₁", "S"], sustainAt: [13, 15] },
  { id: "sarali-13", category: "Sarali", status: "verified", title: "Sarali Varisai 13", description: "Zigzag phrases with sustained Ga, Pa and Dha.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "G₃", "R₁", "G₃", "G₃", "G₃", "M₁", "P", "M₁", "P", "P", "D₁", "P", "D₁", "D₁", "M₁", "P", "D₁", "P", "D₁", "N₃", "D₁", "P", "M₁", "P", "D₁", "P", "M₁", "G₃", "R₁", "S"], sustainAt: [5, 11, 15] },
  { id: "sarali-14", category: "Sarali", status: "verified", title: "Sarali Varisai 14", description: "Sustained Pa and upper Sa with paired Dha and Ma.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "G₃", "M₁", "P", "P", "P", "P", "D₁", "D₁", "P", "P", "M₁", "M₁", "P", "P", "D₁", "N₃", "Ṡ", "Ṡ", "Ṡ", "N₃", "D₁", "P", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"], sustainAt: [5, 7, 11, 15, 19] },
  { id: "janta-1", category: "Janta", status: "prototype", title: "Janta Varisai 1", description: "Prototype · paired-note articulation.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "S", "R₁", "R₁", "G₃", "G₃", "M₁", "M₁", "P", "P", "D₁", "D₁", "N₃", "N₃", "Ṡ", "Ṡ"] },
  { id: "alankaram-1", category: "Alankaram", status: "prototype", title: "Four-note Alankaram", description: "Prototype · a flowing four-note pattern.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "G₃", "M₁", "R₁", "G₃", "M₁", "P", "G₃", "M₁", "P", "D₁", "M₁", "P", "D₁", "N₃"] },
  { id: "pyramid-1", category: "Pyramid", status: "prototype", title: "Growing pyramid", description: "Prototype · add one swara at a time.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "S", "R₁", "S", "S", "R₁", "G₃", "R₁", "S", "S", "R₁", "G₃", "M₁", "G₃", "R₁", "S"], visualization: { kind: "pyramid", rows: [1, 3, 5, 7] } },
] as const satisfies readonly Exercise[];

function validateCatalog(items: readonly Exercise[]): readonly Exercise[] {
  const ids = new Set<string>();
  const validSwaras = new Set<string>(SWARAS);
  for (const item of items) {
    if (ids.has(item.id)) throw new Error(`Duplicate exercise id: ${item.id}`);
    if (item.sequence.length === 0) throw new Error(`Exercise ${item.id} has no swaras`);
    if (item.scaleId !== MAYAMALAVAGOWLA.id) throw new Error(`Unknown scale for exercise ${item.id}`);
    if (item.sequence.some((swara) => !validSwaras.has(swara))) throw new Error(`Exercise ${item.id} contains an unsupported swara`);
    if (item.sustainAt?.some((index) => index <= 0 || index >= item.sequence.length || item.sequence[index] !== item.sequence[index - 1])) {
      throw new Error(`Exercise ${item.id} has an invalid sustained beat`);
    }
    if (item.visualization?.kind === "pyramid") {
      const displayedNotes = item.visualization.rows.reduce((total, rowLength) => total + rowLength, 0);
      const hasInvalidRows = item.visualization.rows.some((rowLength, index, rows) =>
        rowLength <= 0 || rowLength % 2 === 0 || (index > 0 && rowLength <= rows[index - 1]),
      );
      if (displayedNotes !== item.sequence.length || hasInvalidRows) {
        throw new Error(`Exercise ${item.id} has an invalid pyramid visualization`);
      }
    }
    ids.add(item.id);
  }
  return Object.freeze([...items]);
}

export const EXERCISES = validateCatalog(definitions);
export function getExerciseById(id: string): Exercise {
  return EXERCISES.find((exercise) => exercise.id === id) ?? EXERCISES[0];
}
export function filterExercises(filter: ExerciseFilter): readonly Exercise[] {
  return filter === "All" ? EXERCISES : EXERCISES.filter((exercise) => exercise.category === filter);
}

export function getRagaById(id: string): ScaleDefinition {
  return RAGAS.find((raga) => raga.id === id) ?? MAYAMALAVAGOWLA;
}

export function adaptExerciseToRaga(exercise: Exercise, raga: ScaleDefinition): Exercise {
  if (exercise.category !== "Sarali" || raga.id === MAYAMALAVAGOWLA.id) return exercise;
  const sequence = exercise.sequence.map((swara) => {
    const degree = MAYAMALAVAGOWLA.ascending.indexOf(swara);
    const adaptedSwara = raga.ascending[degree];
    if (degree < 0 || !adaptedSwara) throw new Error(`Cannot adapt ${swara} to ${raga.name}`);
    return adaptedSwara;
  });
  return { ...exercise, scaleId: raga.id, sequence };
}
