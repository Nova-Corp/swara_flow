import type { Metadata } from "next";
import { LessonPage, type LessonContent } from "../_components/LessonPage";

export const metadata: Metadata = {
  title: "Sarali Varisai 1 Notation & Practice Guide | Swara Flow",
  description: "Learn Sarali Varisai 1 in Mayamalavagowla with readable Carnatic notation, a four-step practice method and interactive swara playback.",
  alternates: { canonical: "/learn/sarali-varisai-1" },
  openGraph: { title: "Sarali Varisai 1 Notation & Practice Guide", description: "Readable notation and a focused beginner practice method.", url: "/learn/sarali-varisai-1" },
};

const lesson: LessonContent = {
  number: 1,
  exerciseId: "sarali-1",
  title: "Sarali Varisai 1",
  eyebrow: "Lesson 01 · Establish the octave",
  description: "Follow the swaras step by step from lower Sa to upper Sa, then return with the same steadiness and attention.",
  focus: "An even ascent and descent",
  phrases: [
    { label: "Ascending", notes: ["S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ"] },
    { label: "Descending", notes: ["Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"] },
  ],
  practiceSteps: [
    { title: "Anchor your Sa", detail: "Start the tanpura or play Sa. Listen until the tonic feels settled before singing." },
    { title: "Sing one swara per pulse", detail: "Use first speed and keep every note equal. Avoid stretching the top or bottom Sa." },
    { title: "Connect both directions", detail: "Sing the ascent and descent without stopping, while keeping the return journey controlled." },
    { title: "Add speed only after clarity", detail: "Try second and third speed only when pitch and pulse remain stable at first speed." },
  ],
  mistakes: ["Keep upper Sa relaxed; do not reach for it with extra force.", "Give the descending notes the same attention as the ascent.", "Return to the original Sa and check that it still matches the drone."],
};

export default function SaraliVarisaiOnePage() { return <LessonPage lesson={lesson} />; }

