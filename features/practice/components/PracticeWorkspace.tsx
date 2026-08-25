"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TONE_PLAYER_FACTORIES, type InstrumentId } from "../audio/instruments";
import { adaptExerciseToRaga, DEFAULT_EXERCISE_FILTER, filterExercises, getExerciseById, getRagaById, MAYAMALAVAGOWLA, RAGAS, TONIC_OPTIONS } from "../domain/catalog";
import type { ExerciseFilter } from "../domain/catalog";
import { useExercisePlayer } from "../hooks/useExercisePlayer";
import { useTanpura } from "../hooks/useTanpura";
import { ExerciseLibrary } from "./ExerciseLibrary";
import { PracticePanel } from "./PracticePanel";

export function PracticeWorkspace() {
  const workspaceRef = useRef<HTMLElement | null>(null);
  const [filter, setFilter] = useState<ExerciseFilter>(DEFAULT_EXERCISE_FILTER);
  const [exerciseId, setExerciseId] = useState(filterExercises(DEFAULT_EXERCISE_FILTER)[0].id);
  const [ragaId, setRagaId] = useState(MAYAMALAVAGOWLA.id);
  const [tempo, setTempo] = useState(72);
  const [tonic, setTonic] = useState(TONIC_OPTIONS[0]);
  const [instrument, setInstrument] = useState<InstrumentId>("flute");
  const [countInEnabled, setCountInEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFullscreenSupported, setIsFullscreenSupported] = useState(false);
  const filteredExercises = useMemo(() => filterExercises(filter), [filter]);
  const baseExercise = getExerciseById(exerciseId);
  const scale = baseExercise.category === "Sarali" ? getRagaById(ragaId) : MAYAMALAVAGOWLA;
  const exercise = useMemo(() => adaptExerciseToRaga(baseExercise, scale), [baseExercise, scale]);
  const player = useExercisePlayer({
    exercise,
    scale,
    bpm: tempo,
    tonicHz: tonic.hz,
    countInBeats: countInEnabled ? 4 : 0,
    createTonePlayer: TONE_PLAYER_FACTORIES[instrument],
  });
  const tanpura = useTanpura(tonic.hz);

  useEffect(() => {
    setIsFullscreenSupported(Boolean(workspaceRef.current?.requestFullscreen));
    const handleFullscreenChange = () => setIsFullscreen(document.fullscreenElement === workspaceRef.current);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  async function toggleFullscreen() {
    if (!workspaceRef.current || !isFullscreenSupported) return;
    try {
      if (document.fullscreenElement === workspaceRef.current) await document.exitFullscreen();
      else await workspaceRef.current.requestFullscreen();
    } catch {
      setIsFullscreen(false);
    }
  }

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
    <section ref={workspaceRef} className="workspace" aria-label="Practice workspace">
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
        countInBeat={player.countInBeat}
        countInEnabled={countInEnabled}
        isFullscreen={isFullscreen}
        isFullscreenSupported={isFullscreenSupported}
        isTanpuraEnabled={tanpura.isEnabled}
        tanpuraVolume={tanpura.volume}
        tanpuraError={tanpura.error}
        onInstrumentChange={(nextInstrument) => { player.stop(); setInstrument(nextInstrument); }}
        onRagaChange={(nextRaga) => { player.stop(); setRagaId(nextRaga.id); }}
        onTonicChange={(nextTonic) => { player.stop(); setTonic(nextTonic); }}
        onTempoChange={(nextTempo) => { player.stop(); setTempo(nextTempo); }}
        onCountInToggle={() => { player.stop(); setCountInEnabled((enabled) => !enabled); }}
        onFullscreenToggle={() => { void toggleFullscreen(); }}
        onTanpuraToggle={() => { void tanpura.toggle(); }}
        onTanpuraVolumeChange={tanpura.setVolume}
        onPlayTone={(index) => { player.stop(); void player.playToneAt(index); }}
        onPlay={player.play}
        onStop={player.stop}
      />
    </section>
  );
}
