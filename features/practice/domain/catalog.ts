import { Exercise, ExerciseCategory, ScaleDefinition, SWARAS, TonicOption } from "./types";

export const MAYAMALAVAGOWLA: ScaleDefinition = {
  id: "mayamalavagowla",
  name: "Mayamalavagowla",
  semitones: { S: 0, "R₁": 1, "G₃": 4, "M₁": 5, P: 7, "D₁": 8, "N₃": 11, "Ṡ": 12 },
};

export const EXERCISE_CATEGORIES = ["All", "Sarali", "Janta", "Alankaram", "Pyramid"] as const;
export type ExerciseFilter = "All" | ExerciseCategory;

export const TONIC_OPTIONS: readonly TonicOption[] = [
  { label: "C", hz: 261.63 }, { label: "C♯", hz: 277.18 },
  { label: "D", hz: 293.66 }, { label: "D♯", hz: 311.13 },
  { label: "E", hz: 329.63 }, { label: "F", hz: 349.23 },
  { label: "F♯", hz: 369.99 }, { label: "G", hz: 392 },
];

const definitions = [
  { id: "sarali-1", category: "Sarali", title: "Sarali Varisai 1", description: "A steady ascent and descent through the octave.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"] },
  { id: "sarali-2", category: "Sarali", title: "Sarali Varisai 2", description: "Short returning movements for clean transitions.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "S", "R₁", "S", "R₁", "G₃", "M₁", "R₁", "G₃", "R₁", "G₃", "R₁", "G₃", "M₁", "P"] },
  { id: "janta-1", category: "Janta", title: "Janta Varisai 1", description: "Paired notes to strengthen breath and articulation.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "S", "R₁", "R₁", "G₃", "G₃", "M₁", "M₁", "P", "P", "D₁", "D₁", "N₃", "N₃", "Ṡ", "Ṡ"] },
  { id: "alankaram-1", category: "Alankaram", title: "Four-note Alankaram", description: "A flowing exercise built from four-note groups.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "R₁", "G₃", "M₁", "R₁", "G₃", "M₁", "P", "G₃", "M₁", "P", "D₁", "M₁", "P", "D₁", "N₃"] },
  { id: "pyramid-1", category: "Pyramid", title: "Growing pyramid", description: "Add one swara at a time, then return to Sa.", scaleId: MAYAMALAVAGOWLA.id, sequence: ["S", "S", "R₁", "S", "S", "R₁", "G₃", "R₁", "S", "S", "R₁", "G₃", "M₁", "G₃", "R₁", "S"] },
] as const satisfies readonly Exercise[];

function validateCatalog(items: readonly Exercise[]): readonly Exercise[] {
  const ids = new Set<string>();
  const validSwaras = new Set<string>(SWARAS);
  for (const item of items) {
    if (ids.has(item.id)) throw new Error(`Duplicate exercise id: ${item.id}`);
    if (item.sequence.length === 0) throw new Error(`Exercise ${item.id} has no swaras`);
    if (item.scaleId !== MAYAMALAVAGOWLA.id) throw new Error(`Unknown scale for exercise ${item.id}`);
    if (item.sequence.some((swara) => !validSwaras.has(swara))) throw new Error(`Exercise ${item.id} contains an unsupported swara`);
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
