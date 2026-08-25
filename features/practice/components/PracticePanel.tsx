import { TONIC_OPTIONS } from "../domain/catalog";
import type { Exercise, ScaleDefinition, TonicOption } from "../domain/types";

type Props = Readonly<{
  exercise: Exercise;
  scale: ScaleDefinition;
  tonic: TonicOption;
  tempo: number;
  activeIndex: number;
  isPlaying: boolean;
  audioError: string | null;
  onTonicChange: (tonic: TonicOption) => void;
  onTempoChange: (tempo: number) => void;
  onPlayTone: (index: number) => void;
  onPlay: () => void;
  onStop: () => void;
}>;

export function PracticePanel({ exercise, scale, tonic, tempo, activeIndex, isPlaying, audioError, onTonicChange, onTempoChange, onPlayTone, onPlay, onStop }: Props) {
  return (
    <div className="practicePanel">
      <div className="practiceHeader">
        <div>
          <p className="eyebrow">Now practising · {exercise.category} · {scale.name}</p>
          <h2>{exercise.title}</h2>
          <p>{exercise.description}</p>
        </div>
        <div className="settings">
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

      <div className="notation" aria-label={`${exercise.title} notation`}>
        {exercise.sequence.map((swara, index) => (
          <button
            className={activeIndex === index ? "current" : activeIndex > index ? "passed" : ""}
            key={`${swara}-${index}`}
            onClick={() => onPlayTone(index)}
            aria-label={`Play ${swara}`}
            aria-current={activeIndex === index ? "step" : undefined}
          >
            <span>{swara}</span><i aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="transport">
        <button className="restart" onClick={onStop} aria-label="Restart">↺</button>
        <button className="play" onClick={isPlaying ? onStop : onPlay}>
          {isPlaying ? "Pause" : "Play exercise"}<span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
        </button>
        <p>Tap any swara to hear it</p>
      </div>
      <p className="audioStatus" role="status" aria-live="polite">{audioError ?? ""}</p>
    </div>
  );
}
