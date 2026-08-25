import type { Exercise, Swara } from "../domain/types";

type Props = Readonly<{
  exercise: Exercise;
  activeIndex: number;
  onPlayTone: (index: number) => void;
}>;

type IndexedSwara = Readonly<{ swara: Swara; index: number }>;

export function splitPyramidRows(exercise: Exercise): readonly IndexedSwara[][] {
  if (exercise.visualization?.kind !== "pyramid") return [];
  let offset = 0;
  return exercise.visualization.rows.map((length) => {
    const row = exercise.sequence.slice(offset, offset + length).map((swara, rowIndex) => ({
      swara,
      index: offset + rowIndex,
    }));
    offset += length;
    return row;
  });
}

function SwaraButton({ note, activeIndex, onPlayTone }: Readonly<{ note: IndexedSwara; activeIndex: number; onPlayTone: (index: number) => void }>) {
  return (
    <button
      className={activeIndex === note.index ? "current" : activeIndex > note.index ? "passed" : ""}
      onClick={() => onPlayTone(note.index)}
      aria-label={`Play ${note.swara}`}
      aria-current={activeIndex === note.index ? "step" : undefined}
    >
      <span>{note.swara}</span><i aria-hidden="true" />
    </button>
  );
}

export function ExerciseNotation({ exercise, activeIndex, onPlayTone }: Props) {
  const pyramidRows = splitPyramidRows(exercise);

  if (pyramidRows.length > 0) {
    return (
      <div className="notation pyramidNotation" aria-label={`${exercise.title} notation`}>
        {pyramidRows.map((row, rowIndex) => (
          <div className="pyramidRow" key={rowIndex}>
            {row.map((note) => <SwaraButton key={note.index} note={note} activeIndex={activeIndex} onPlayTone={onPlayTone} />)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="notation" aria-label={`${exercise.title} notation`}>
      {exercise.sequence.map((swara, index) => (
        <SwaraButton key={`${swara}-${index}`} note={{ swara, index }} activeIndex={activeIndex} onPlayTone={onPlayTone} />
      ))}
    </div>
  );
}
