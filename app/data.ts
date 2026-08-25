export type Exercise = {
  id: string;
  category: "Sarali" | "Janta" | "Alankaram" | "Pyramid";
  title: string;
  description: string;
  sequence: string[];
};

export const exercises: Exercise[] = [
  {
    id: "sarali-1",
    category: "Sarali",
    title: "Sarali Varisai 1",
    description: "A steady ascent and descent through the octave.",
    sequence: ["S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ", "Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"],
  },
  {
    id: "sarali-2",
    category: "Sarali",
    title: "Sarali Varisai 2",
    description: "Short returning movements for clean transitions.",
    sequence: ["S", "R₁", "S", "R₁", "S", "R₁", "G₃", "M₁", "R₁", "G₃", "R₁", "G₃", "R₁", "G₃", "M₁", "P"],
  },
  {
    id: "janta-1",
    category: "Janta",
    title: "Janta Varisai 1",
    description: "Paired notes to strengthen breath and articulation.",
    sequence: ["S", "S", "R₁", "R₁", "G₃", "G₃", "M₁", "M₁", "P", "P", "D₁", "D₁", "N₃", "N₃", "Ṡ", "Ṡ"],
  },
  {
    id: "alankaram-1",
    category: "Alankaram",
    title: "Four-note Alankaram",
    description: "A flowing exercise built from four-note groups.",
    sequence: ["S", "R₁", "G₃", "M₁", "R₁", "G₃", "M₁", "P", "G₃", "M₁", "P", "D₁", "M₁", "P", "D₁", "N₃"],
  },
  {
    id: "pyramid-1",
    category: "Pyramid",
    title: "Growing pyramid",
    description: "Add one swara at a time, then return to Sa.",
    sequence: ["S", "S", "R₁", "S", "S", "R₁", "G₃", "R₁", "S", "S", "R₁", "G₃", "M₁", "G₃", "R₁", "S"],
  },
];

export const swaraSemitones: Record<string, number> = {
  S: 0,
  "R₁": 1,
  "G₃": 4,
  "M₁": 5,
  P: 7,
  "D₁": 8,
  "N₃": 11,
  "Ṡ": 12,
};
