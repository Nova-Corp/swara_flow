import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "../../../lib/site";
import { LessonChrome } from "../_components/LessonChrome";

export const metadata: Metadata = {
  title: "Sarali Varisai Practice Guide for Beginners | Swara Flow",
  description: "Learn how to practise Sarali Varisai in Mayamalavagowla with readable notation, three traditional speeds and interactive swara playback.",
  alternates: { canonical: "/learn/sarali-varisai" },
  openGraph: {
    title: "Sarali Varisai Practice Guide for Beginners",
    description: "A clear starting path for Carnatic music beginners, with notation and interactive practice.",
    url: "/learn/sarali-varisai",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Swara Flow Sarali Varisai practice guide" }],
  },
};

const lessons = [
  { number: "01", href: "/learn/sarali-varisai-1", title: "Sarali Varisai 1", detail: "Meet the complete ascending and descending scale movement.", notes: "S R₁ G₃ M₁ · P D₁ N₃ Ṡ" },
  { number: "02", href: "/learn/sarali-varisai-2", title: "Sarali Varisai 2", detail: "Build control with the first repeating Ri and Ni phrases.", notes: "S R₁ S R₁ · S R₁ G₃ M₁" },
] as const;

export default function SaraliVarisaiGuide() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Sarali Varisai Practice Guide for Beginners",
    description: "A beginner learning path for practising Sarali Varisai in Mayamalavagowla.",
    url: absoluteUrl("/learn/sarali-varisai"),
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", name: "Swara Flow", url: absoluteUrl("/") },
  };

  return (
    <LessonChrome>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className="lessonHero lessonCollectionHero">
        <div className="lessonHeroInner">
          <nav className="lessonBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Lessons</span></nav>
          <div className="lessonCollectionCopy">
            <p className="lessonEyebrow"><span aria-hidden="true">✦</span> Beginner learning path</p>
            <h1>Start Sarali Varisai<br /><em>with clarity.</em></h1>
            <p className="lessonLead">A calm, practical introduction to the first Carnatic exercises—what the notation means, how to move through it, and what to listen for while you practise.</p>
            <div className="lessonFacts" aria-label="Course facts">
              <span><b>14</b> practice patterns</span><span><b>3</b> traditional speeds</span><span><b>2</b> available ragas</span>
            </div>
          </div>
        </div>
      </section>

      <section className="lessonContent">
        <div className="lessonSectionHeading">
          <div><p className="lessonEyebrow"><span aria-hidden="true">01</span> Start here</p><h2>Two lessons.<br /><em>One clear foundation.</em></h2></div>
          <p>Begin slowly. First learn the direction of every phrase, then use the practice room to hear each swara and explore the three speeds.</p>
        </div>
        <div className="lessonCardGrid">
          {lessons.map((lesson) => (
            <Link className="lessonCard" href={lesson.href} key={lesson.number}>
              <span className="lessonCardNumber">{lesson.number}</span>
              <div><p>Mayamalavagowla</p><h2>{lesson.title}</h2><span>{lesson.detail}</span></div>
              <div className="lessonCardNotes" aria-hidden="true">{lesson.notes}</div>
              <span className="lessonCardArrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>

        <div className="lessonPrimer">
          <div><p className="lessonEyebrow"><span aria-hidden="true">02</span> Before you begin</p><h2>A simple way to practise</h2></div>
          <ol>
            <li><span>01</span><strong>Set a comfortable Sa</strong><p>Choose a tonic you can sing without strain and keep it unchanged through the session.</p></li>
            <li><span>02</span><strong>Listen, then sing</strong><p>Hear the phrase once. Sing it back slowly while keeping every swara clear.</p></li>
            <li><span>03</span><strong>Earn the next speed</strong><p>Move faster only when the first speed stays even from beginning to end.</p></li>
          </ol>
        </div>

        <aside className="lessonTrustNote">
          <span aria-hidden="true">i</span>
          <div><strong>A practice companion, not a replacement for a teacher</strong><p>Swara Flow presents a common beginner pathway. A qualified Carnatic teacher can help with pitch accuracy, voice production and variations in teaching tradition.</p></div>
          <Link href="/#practice-workspace">Open practice room <span aria-hidden="true">→</span></Link>
        </aside>
      </section>
    </LessonChrome>
  );
}

