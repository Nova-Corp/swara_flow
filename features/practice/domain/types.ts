export const SWARAS = ["S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ"] as const;

export type Swara = (typeof SWARAS)[number];
export type ExerciseCategory = "Sarali" | "Janta" | "Alankaram" | "Pyramid";

export type ScaleDefinition = Readonly<{
  id: string;
  name: string;
  semitones: Readonly<Record<Swara, number>>;
}>;

export type Exercise = Readonly<{
  id: string;
  category: ExerciseCategory;
  status: "verified" | "prototype";
  title: string;
  description: string;
  scaleId: ScaleDefinition["id"];
  sequence: readonly Swara[];
  sustainAt?: readonly number[];
  visualization?: Readonly<{
    kind: "pyramid";
    rows: readonly number[];
  }>;
}>;

export type TonicOption = Readonly<{
  label: string;
  hz: number;
}>;
