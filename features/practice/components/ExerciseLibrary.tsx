import { EXERCISE_CATEGORIES } from "../domain/catalog";
import type { ExerciseFilter } from "../domain/catalog";
import type { Exercise } from "../domain/types";
import { CATEGORY_TAMIL, exerciseDescriptionTamil, exerciseTitleTamil, type Language } from "../../i18n/language";

type Props = Readonly<{
  language: Language;
  exercises: readonly Exercise[];
  filter: ExerciseFilter;
  selectedId: string;
  onFilterChange: (filter: ExerciseFilter) => void;
  onSelect: (id: string) => void;
}>;

export function ExerciseLibrary({ language, exercises, filter, selectedId, onFilterChange, onSelect }: Props) {
  const isTamil = language === "ta";
  return (
    <aside className="library">
      <div className="sectionHeading">
        <div><span className="libraryKicker">{isTamil ? "உங்கள் பாடம்" : "Your lesson"}</span><p>{isTamil ? "பயிற்சித் தொகுப்பு" : "Exercise library"}</p></div>
        <span className="patternCount">{exercises.length} {isTamil ? "வடிவங்கள்" : "patterns"}</span>
      </div>
      <div className="filters" aria-label={isTamil ? "பயிற்சிகளை வடிகட்டவும்" : "Filter exercises"}>
        {EXERCISE_CATEGORIES.map((item) => (
          <button aria-pressed={filter === item} className={filter === item ? "active" : ""} key={item} onClick={() => onFilterChange(item)}>
            {isTamil ? CATEGORY_TAMIL[item] : item}
          </button>
        ))}
      </div>
      <div className="exerciseList">
        {exercises.map((exercise, index) => (
          <button
            aria-current={selectedId === exercise.id ? "true" : undefined}
            className={`exerciseCard ${selectedId === exercise.id ? "selected" : ""}`}
            key={exercise.id}
            onClick={() => onSelect(exercise.id)}
          >
            <span className="exerciseNumber">{String(index + 1).padStart(2, "0")}</span>
            <span><strong>{isTamil ? exerciseTitleTamil(exercise.id, exercise.title) : exercise.title}</strong><small>{isTamil ? exerciseDescriptionTamil(exercise.id, exercise.description) : exercise.description}</small></span>
            <span className="arrow" aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
