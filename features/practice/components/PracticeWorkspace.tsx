"use client";

import { useMemo, useState } from "react";
import { TONE_PLAYER_FACTORIES, type InstrumentId } from "../audio/instruments";
import { adaptExerciseToRaga, DEFAULT_EXERCISE_FILTER, filterExercises, getExerciseById, getRagaById, MAYAMALAVAGOWLA, RAGAS, TONIC_OPTIONS } from "../domain/catalog";
import type { ExerciseFilter } from "../domain/catalog";
import { useExercisePlayer } from "../hooks/useExercisePlayer";
import { ExerciseLibrary } from "./ExerciseLibrary";
import { PracticePanel } from "./PracticePanel";

export function PracticeWorkspace() {
  const [filter, setFilter] = useState<ExerciseFilter>(DEFAULT_EXERCISE_FILTER);
  const [exerciseId, setExerciseId] = useState(filterExercises(DEFAULT_EXERCISE_FILTER)[0].id);
  const [ragaId, setRagaId] = useState(MAYAMALAVAGOWLA.id);
  const [tempo, setTempo] = useState(72);
  const [tonic, setTonic] = useState(TONIC_OPTIONS[0]);
  const [instrument, setInstrument] = useState<InstrumentId>("flute");
  const filteredExercises = useMemo(() => filterExercises(filter), [filter]);
  const baseExercise = getExerciseById(exerciseId);
  const scale = baseExercise.category === "Sarali" ? getRagaById(ragaId) : MAYAMALAVAGOWLA;
  const exercise = useMemo(() => adaptExerciseToRaga(baseExercise, scale), [baseExercise, scale]);
  const player = useExercisePlayer({
    exercise,
    scale,
    bpm: tempo,
    tonicHz: tonic.hz,
    createTonePlayer: TONE_PLAYER_FACTORIES[instrument],
  });

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
        scale={scale}
        ragas={RAGAS}
        tonic={tonic}
        tempo={tempo}
        activeIndex={player.activeIndex}
        isPlaying={player.isPlaying}
        audioError={player.audioError}
        instrument={instrument}
        isLoadingAudio={player.isLoadingAudio}
        onInstrumentChange={(nextInstrument) => { player.stop(); setInstrument(nextInstrument); }}
        onRagaChange={(nextRaga) => { player.stop(); setRagaId(nextRaga.id); }}
        onTonicChange={(nextTonic) => { player.stop(); setTonic(nextTonic); }}
        onTempoChange={(nextTempo) => { player.stop(); setTempo(nextTempo); }}
        onPlayTone={(index) => { player.stop(); void player.playToneAt(index); }}
        onPlay={player.play}
        onStop={player.stop}
      />
    </section>
  );
}
