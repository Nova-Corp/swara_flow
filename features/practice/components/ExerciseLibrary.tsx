import { EXERCISE_CATEGORIES } from "../domain/catalog";
import type { ExerciseFilter } from "../domain/catalog";
import type { Exercise } from "../domain/types";

type Props = Readonly<{
  exercises: readonly Exercise[];
  filter: ExerciseFilter;
  selectedId: string;
  onFilterChange: (filter: ExerciseFilter) => void;
  onSelect: (id: string) => void;
}>;

export function ExerciseLibrary({ exercises, filter, selectedId, onFilterChange, onSelect }: Props) {
  return (
    <aside className="library">
      <div className="sectionHeading">
        <div><span className="libraryKicker">Your lesson</span><p>Exercise library</p></div>
        <span className="patternCount">{exercises.length} patterns</span>
      </div>
      <div className="filters" aria-label="Filter exercises">
        {EXERCISE_CATEGORIES.map((item) => (
          <button aria-pressed={filter === item} className={filter === item ? "active" : ""} key={item} onClick={() => onFilterChange(item)}>
            {item}
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
            <span><strong>{exercise.title}</strong><small>{exercise.description}</small></span>
            <span className="arrow" aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
