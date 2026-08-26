import Link from "next/link";
import { getExerciseById } from "../../../features/practice/domain/catalog";
import type { Swara } from "../../../features/practice/domain/types";
import { absoluteUrl } from "../../../lib/site";
import { LessonChrome } from "./LessonChrome";

export type LessonContent = Readonly<{
  number: 1 | 2;
  exerciseId: "sarali-1" | "sarali-2";
  title: string;
  eyebrow: string;
  description: string;
  focus: string;
  phrases: readonly Readonly<{ label: string; notes: readonly Swara[] }>[];
  practiceSteps: readonly Readonly<{ title: string; detail: string }>[];
  mistakes: readonly string[];
}>;

function StructuredData({ lesson }: Readonly<{ lesson: LessonContent }>) {
  const url = absoluteUrl(`/learn/sarali-varisai-${lesson.number}`);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        "@id": `${url}#lesson`,
        name: lesson.title,
        description: lesson.description,
        url,
        inLanguage: "en-IN",
        isAccessibleForFree: true,
        educationalLevel: "Beginner",
        learningResourceType: "Practice guide",
        about: ["Carnatic music", "Sarali Varisai", "Mayamalavagowla"],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Sarali Varisai", item: absoluteUrl("/learn/sarali-varisai") },
          { "@type": "ListItem", position: 3, name: lesson.title, item: url },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

function NotationPhrase({ label, notes }: Readonly<{ label: string; notes: readonly Swara[] }>) {
  return (
    <div className="lessonPhrase">
      <span>{label}</span>
      <div className="lessonNotes" aria-label={`${label}: ${notes.join(", ")}`}>
        {notes.map((note, index) => <b key={`${label}-${note}-${index}`}>{note}</b>)}
      </div>
    </div>
  );
}

export function LessonPage({ lesson }: Readonly<{ lesson: LessonContent }>) {
  const exercise = getExerciseById(lesson.exerciseId);
  const otherLesson = lesson.number === 1 ? 2 : 1;

  return (
    <LessonChrome>
      <StructuredData lesson={lesson} />
      <section className="lessonHero lessonDetailHero">
        <div className="lessonHeroInner">
          <nav className="lessonBreadcrumb" aria-label="Breadcrumb">
            <Link href="/learn/sarali-varisai">Sarali Varisai</Link><span aria-hidden="true">/</span><span>Lesson {lesson.number}</span>
          </nav>
          <div className="lessonHeroGrid">
            <div>
              <p className="lessonEyebrow"><span aria-hidden="true">✦</span> {lesson.eyebrow}</p>
              <h1>{lesson.title}</h1>
              <p className="lessonLead">{lesson.description}</p>
              <div className="lessonHeroActions">
                <Link className="lessonPrimaryAction" href={`/?exercise=${lesson.exerciseId}#practice-workspace`}>
                  Practise this lesson <span aria-hidden="true">▶</span>
                </Link>
                <a className="lessonTextAction" href="#notation">Read the notation <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <aside className="lessonFocusCard" aria-label="Lesson focus">
              <span>Today’s focus</span>
              <strong>{lesson.focus}</strong>
              <dl>
                <div><dt>Raga</dt><dd>Mayamalavagowla</dd></div>
                <div><dt>Level</dt><dd>Beginner</dd></div>
                <div><dt>Length</dt><dd>{exercise.sequence.length} swaras</dd></div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="lessonContent" id="notation">
        <div className="lessonSectionHeading">
          <div>
            <p className="lessonEyebrow"><span aria-hidden="true">01</span> Notation</p>
            <h2>See the phrase.<br /><em>Sing the movement.</em></h2>
          </div>
          <p>Keep one comfortable Sa throughout. Read from left to right and give every swara equal space at first speed.</p>
        </div>

        <div className="lessonNotationCard">
          <div className="lessonNotationHeader">
            <div><span>Mayamalavagowla</span><strong>{lesson.title}</strong></div>
            <span className="lessonBadge">Beginner curriculum</span>
          </div>
          <div className="lessonPhraseList">
            {lesson.phrases.map((phrase) => <NotationPhrase key={phrase.label} {...phrase} />)}
          </div>
          <div className="notationKey">
            <span><b>S</b> Sa</span><span><b>R₁</b> Shuddha Rishabham</span><span><b>G₃</b> Antara Gandharam</span><span><b>Ṡ</b> Upper Sa</span>
          </div>
        </div>

        <div className="lessonGuideGrid">
          <article className="lessonGuideCard">
            <p className="lessonEyebrow"><span aria-hidden="true">02</span> Practice method</p>
            <h2>A steady four-step routine</h2>
            <ol className="lessonSteps">
              {lesson.practiceSteps.map((step, index) => (
                <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div></li>
              ))}
            </ol>
          </article>
          <aside className="lessonMistakesCard">
            <p className="lessonEyebrow"><span aria-hidden="true">03</span> Listen for</p>
            <h2>Common points to notice</h2>
            <ul>{lesson.mistakes.map((mistake) => <li key={mistake}><span aria-hidden="true">✓</span>{mistake}</li>)}</ul>
            <div className="teacherNote">
              <strong>Learn with context</strong>
              <p>This is a beginner practice aid, not a substitute for a teacher. Notation and teaching order can vary across traditions.</p>
            </div>
          </aside>
        </div>

        <div className="lessonNextCard">
          <div><span>Continue learning</span><h2>{otherLesson === 2 ? "Add the first repeating phrase." : "Revisit the foundation slowly."}</h2></div>
          <Link href={`/learn/sarali-varisai-${otherLesson}`}>Sarali Varisai {otherLesson} <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </LessonChrome>
  );
}

