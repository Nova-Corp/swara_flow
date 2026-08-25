import type { ExerciseCategory } from "../practice/domain/types";

export type Language = "en" | "ta";

export const CATEGORY_TAMIL: Record<"All" | ExerciseCategory, string> = {
  All: "அனைத்தும்",
  Sarali: "சரளி",
  Janta: "ஜண்டை",
  Alankaram: "அலங்காரம்",
  Pyramid: "பிரமிட்",
};

export function exerciseTitleTamil(id: string, fallback: string): string {
  const number = id.match(/\d+$/)?.[0];
  if (id.startsWith("sarali-") && number) return `சரளி வரிசை ${number}`;
  if (id === "janta-1") return "ஜண்டை வரிசை 1";
  if (id === "alankaram-1") return "நான்கு-ஸ்வர அலங்காரம்";
  const pyramidTitles: Record<string, string> = {
    "pyramid-1": "ம வரை பிரமிட்",
    "pyramid-2": "ப வரை பிரமிட்",
    "pyramid-3": "த வரை பிரமிட்",
    "pyramid-4": "நி வரை பிரமிட்",
    "pyramid-5": "முழு ஸ்தாயி பிரமிட்",
  };
  return pyramidTitles[id] ?? fallback;
}

const TAMIL_DESCRIPTIONS: Record<string, string> = {
  "sarali-1": "எளிய ஏறுவரிசையும் இறங்குவரிசையும்.",
  "sarali-2": "ஏறுவரிசையில் ரி, இறங்குவரிசையில் நி மீது கவனம்.",
  "sarali-3": "ஏறுவரிசையில் க, இறங்குவரிசையில் த மீது கவனம்.",
  "sarali-4": "ஏறுவரிசையில் ம, இறங்குவரிசையில் ப மீது கவனம்.",
  "sarali-5": "நீட்டிக்கப்பட்ட ப மற்றும் ம சொற்றொடர்கள்.",
  "sarali-6": "க மற்றும் த சொற்றொடர் பயிற்சி.",
  "sarali-7": "நீட்டிக்கப்பட்ட நி மற்றும் ரி சொற்றொடர்கள்.",
  "sarali-8": "ப–ம–க–ரி வளைவு சொற்றொடர்கள்.",
  "sarali-9": "ப–ம–த–ப வளைவு சொற்றொடர்கள்.",
  "sarali-10": "நீண்ட ப மற்றும் ஓய்வுள்ள க சொற்றொடர்கள்.",
  "sarali-11": "மேல் ச, நி, த மற்றும் ப நீட்டிப்புப் பயிற்சி.",
  "sarali-12": "இரட்டை ஸ்வர உச்சரிப்பின் அறிமுகம்.",
  "sarali-13": "நீட்டிக்கப்பட்ட க, ப மற்றும் த உடன் வளைவு சொற்றொடர்கள்.",
  "sarali-14": "நீட்டிக்கப்பட்ட ப, மேல் ச மற்றும் இரட்டை த, ம பயிற்சி.",
  "janta-1": "முன்மாதிரி · இரட்டை ஸ்வர உச்சரிப்பு.",
  "alankaram-1": "முன்மாதிரி · ஓடும் நான்கு-ஸ்வர வடிவம்.",
  "pyramid-1": "ச முதல் ம வரை படிப்படியாக ஏறி, மீண்டும் ச-க்கு திரும்புங்கள்.",
  "pyramid-2": "ச முதல் ப வரை படிப்படியாக ஏறி, மீண்டும் ச-க்கு திரும்புங்கள்.",
  "pyramid-3": "ச முதல் த வரை படிப்படியாக ஏறி, மீண்டும் ச-க்கு திரும்புங்கள்.",
  "pyramid-4": "ச முதல் நி வரை படிப்படியாக ஏறி, மீண்டும் ச-க்கு திரும்புங்கள்.",
  "pyramid-5": "ச முதல் மேல் ச வரை ஏறி, மீண்டும் ச-க்கு திரும்புங்கள்.",
};

export function exerciseDescriptionTamil(id: string, fallback: string): string {
  return TAMIL_DESCRIPTIONS[id] ?? fallback;
}
