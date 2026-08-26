import type { Language } from "../../i18n/language";
import type { Exercise, ScaleDefinition, Swara, TonicOption } from "../domain/types";

const STHANA_LABELS = ["S", "R₁", "R₂ / G₁", "R₃ / G₂", "G₃", "M₁", "M₂", "P", "D₁", "D₂ / N₁", "D₃ / N₂", "N₃", "Ṡ"] as const;

type Props = Readonly<{
  activeIndex: number;
  exercise: Exercise;
  language: Language;
  scale: ScaleDefinition;
  tonic: TonicOption;
}>;

export function SwaraSthanaMap({ activeIndex, exercise, language, scale, tonic }: Props) {
  const isTamil = language === "ta";
  const activeSwara = exercise.sequence[activeIndex];
  const activeSemitone = activeSwara ? scale.semitones[activeSwara] : undefined;
  const localizedScaleName = isTamil ? (scale.id === "mayamalavagowla" ? "மாயாமாளவகௌளை" : "ஹரிகாம்போஜி") : scale.name;
  const scaleSwaras = new Map<number, Swara>();

  for (const swara of scale.ascending) {
    const semitone = scale.semitones[swara];
    if (semitone !== undefined) scaleSwaras.set(semitone, swara);
  }

  const activeFrequency = activeSemitone === undefined ? null : tonic.hz * 2 ** (activeSemitone / 12);

  return (
    <section className="sthanaMap" aria-label={isTamil ? "ஸ்வர ஸ்தான வரைபடம்" : "Swara sthana map"}>
      <header className="sthanaHeader">
        <div><strong>{isTamil ? "ஸ்வர ஸ்தானங்கள்" : "Swara sthanas"}</strong><span>{localizedScaleName}</span></div>
        <div className="sthanaLegend"><span className="ragaLegend" />{isTamil ? "ராக ஸ்வரம்" : "Raga swara"}<span className="otherLegend" />{isTamil ? "மற்ற ஸ்தானம்" : "Other position"}</div>
      </header>
      <div className="sthanaScroller">
        <div className="sthanaRail" role="list" aria-label={isTamil ? "ச முதல் மேல் ச வரை 12 ஸ்வர ஸ்தானங்கள்" : "Twelve pitch positions from Sa to upper Sa"}>
          {STHANA_LABELS.map((label, semitone) => {
            const ragaSwara = scaleSwaras.get(semitone);
            const isActive = activeSemitone === semitone;
            const frequency = tonic.hz * 2 ** (semitone / 12);
            return (
              <div className={`sthanaPosition${ragaSwara ? " inRaga" : ""}${isActive ? " active" : ""}`} role="listitem" aria-current={isActive ? "step" : undefined} key={semitone} title={`${label} · ${frequency.toFixed(1)} Hz`}>
                <span className="sthanaStep">{semitone}</span>
                <span className="sthanaNode"><i aria-hidden="true" /></span>
                <strong>{ragaSwara ?? label}</strong>
              </div>
            );
          })}
        </div>
      </div>
      <p className="sthanaReadout" aria-live="polite">
        {activeSwara && activeFrequency !== null
          ? <><strong>{activeSwara}</strong><span>{activeFrequency.toFixed(1)} Hz</span><span>{activeSemitone} {isTamil ? "அரைத்தொனிகள் ச-க்கு மேல்" : "semitones above Sa"}</span></>
          : <><strong>Sa = {tonic.label}</strong><span>{tonic.hz.toFixed(1)} Hz</span><span>{isTamil ? "ஒவ்வொரு படியும் ஒரு அரைத்தொனி" : "Each step is one semitone"}</span></>}
      </p>
    </section>
  );
}
