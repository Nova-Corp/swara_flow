import { TONIC_OPTIONS } from "../domain/catalog";
import { INSTRUMENTS, type InstrumentId } from "../audio/instruments";
import type { Exercise, ScaleDefinition, TonicOption } from "../domain/types";
import { ExerciseNotation } from "./ExerciseNotation";

type Props = Readonly<{
  exercise: Exercise;
  scale: ScaleDefinition;
  tonic: TonicOption;
  tempo: number;
  activeIndex: number;
  isPlaying: boolean;
  audioError: string | null;
  instrument: InstrumentId;
  isLoadingAudio: boolean;
  onInstrumentChange: (instrument: InstrumentId) => void;
  onTonicChange: (tonic: TonicOption) => void;
  onTempoChange: (tempo: number) => void;
  onPlayTone: (index: number) => void;
  onPlay: () => void;
  onStop: () => void;
}>;

export function PracticePanel({ exercise, scale, tonic, tempo, activeIndex, isPlaying, audioError, instrument, isLoadingAudio, onInstrumentChange, onTonicChange, onTempoChange, onPlayTone, onPlay, onStop }: Props) {
  return (
    <div className="practicePanel">
      <div className="practiceHeader">
        <div>
          <p className="eyebrow">Now practising · {exercise.category} · {scale.name}</p>
          <h2>{exercise.title}</h2>
          <p>{exercise.description}</p>
        </div>
        <div className="settings">
          <label>Voice
            <select value={instrument} onChange={(event) => onInstrumentChange(event.target.value as InstrumentId)}>
              {INSTRUMENTS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <label>Sa
            <select value={tonic.label} onChange={(event) => onTonicChange(TONIC_OPTIONS.find((item) => item.label === event.target.value) ?? TONIC_OPTIONS[0])}>
              {TONIC_OPTIONS.map((item) => <option key={item.label}>{item.label}</option>)}
            </select>
          </label>
          <label>Tempo
            <span>
              <input aria-valuetext={`${tempo} beats per minute`} type="range" min="40" max="180" step="4" value={tempo} onChange={(event) => onTempoChange(Number(event.target.value))} />
              <b>{tempo}</b>
            </span>
          </label>
        </div>
      </div>

      <ExerciseNotation exercise={exercise} activeIndex={activeIndex} onPlayTone={onPlayTone} />

      <div className="transport">
        <button className="restart" onClick={onStop} aria-label="Restart">↺</button>
        <button className="play" onClick={isPlaying ? onStop : onPlay}>
          {isPlaying ? "Pause" : "Play exercise"}<span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
        </button>
        <p>Tap any swara to hear it</p>
      </div>
      <p className="audioStatus" role="status" aria-live="polite">
        {audioError ?? (isLoadingAudio ? "Preparing instrument…" : "")}
      </p>
    </div>
  );
}
