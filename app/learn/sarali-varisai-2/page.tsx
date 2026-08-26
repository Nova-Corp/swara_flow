import type { Metadata } from "next";
import { LessonPage, type LessonContent } from "../_components/LessonPage";

export const metadata: Metadata = {
  title: "Sarali Varisai 2 Notation & Practice Guide | Swara Flow",
  description: "Learn Sarali Varisai 2 in Mayamalavagowla with phrase-by-phrase notation, beginner guidance and interactive swara playback.",
  alternates: { canonical: "/learn/sarali-varisai-2" },
  openGraph: { title: "Sarali Varisai 2 Notation & Practice Guide", description: "Phrase-by-phrase notation and focused beginner guidance.", url: "/learn/sarali-varisai-2" },
};

const lesson: LessonContent = {
  number: 2,
  exerciseId: "sarali-2",
  title: "Sarali Varisai 2",
  eyebrow: "Lesson 02 · Shape the first pattern",
  description: "Add a gentle repeating movement around Ri on the way up and Ni on the way down, while preserving the full octave journey.",
  focus: "Repeat without losing the pulse",
  phrases: [
    { label: "Phrase 1", notes: ["S", "R₁", "S", "R₁", "S", "R₁", "G₃", "M₁"] },
    { label: "Phrase 2", notes: ["S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "Ṡ"] },
    { label: "Phrase 3", notes: ["Ṡ", "N₃", "Ṡ", "N₃", "Ṡ", "N₃", "D₁", "P"] },
    { label: "Phrase 4", notes: ["Ṡ", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"] },
  ],
  practiceSteps: [
    { title: "Recall lesson one", detail: "Sing the plain ascent and descent once so the octave shape is fresh in your ear." },
    { title: "Isolate the repeating phrases", detail: "Practise phrase 1 and phrase 3 separately until the repeated movement stays even." },
    { title: "Join all four phrases", detail: "Keep one pulse through each eight-swara group without pausing between groups." },
    { title: "Check against the drone", detail: "Finish on Sa, listen to the tanpura, and notice whether your final pitch has remained steady." },
  ],
  mistakes: ["Do not accent every repeated Ri or Ni; keep the movement smooth.", "Let each eight-swara phrase occupy the same amount of time.", "Keep phrase 4 calm instead of rushing toward the final Sa."],
};

export default function SaraliVarisaiTwoPage() { return <LessonPage lesson={lesson} />; }

