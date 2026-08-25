"use client";

import { useMemo, useState } from "react";
import { EXERCISES, filterExercises, getExerciseById, MAYAMALAVAGOWLA, TONIC_OPTIONS } from "../domain/catalog";
import type { ExerciseFilter } from "../domain/catalog";
import { useExercisePlayer } from "../hooks/useExercisePlayer";
import { ExerciseLibrary } from "./ExerciseLibrary";
import { PracticePanel } from "./PracticePanel";

export function PracticeWorkspace() {
  const [filter, setFilter] = useState<ExerciseFilter>("All");
  const [exerciseId, setExerciseId] = useState(EXERCISES[0].id);
  const [tempo, setTempo] = useState(72);
  const [tonic, setTonic] = useState(TONIC_OPTIONS[0]);
  const filteredExercises = useMemo(() => filterExercises(filter), [filter]);
  const exercise = getExerciseById(exerciseId);
  const player = useExercisePlayer({ exercise, bpm: tempo, tonicHz: tonic.hz });

  function changeFilter(nextFilter: ExerciseFilter) {
    player.stop();
    const nextExercises = filterExercises(nextFilter);
    setFilter(nextFilter);
    if (!nextExercises.some((item) => item.id === exerciseId)) setExerciseId(nextExercises[0].id);
  }

  function selectExercise(id: string) {
    player.stop();
    setExerciseId(id);
  }

  return (
    <section className="workspace" aria-label="Practice workspace">
      <ExerciseLibrary exercises={filteredExercises} filter={filter} selectedId={exercise.id} onFilterChange={changeFilter} onSelect={selectExercise} />
      <PracticePanel
        exercise={exercise}
        scale={MAYAMALAVAGOWLA}
        tonic={tonic}
        tempo={tempo}
        activeIndex={player.activeIndex}
        isPlaying={player.isPlaying}
        audioError={player.audioError}
        onTonicChange={(nextTonic) => { player.stop(); setTonic(nextTonic); }}
        onTempoChange={(nextTempo) => { player.stop(); setTempo(nextTempo); }}
        onPlayTone={(index) => { player.stop(); void player.playToneAt(index); }}
        onPlay={player.play}
        onStop={player.stop}
      />
    </section>
  );
}
