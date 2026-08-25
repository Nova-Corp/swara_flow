import { TONIC_OPTIONS } from "../domain/catalog";
import { INSTRUMENTS, type InstrumentId } from "../audio/instruments";
import type { Exercise, ScaleDefinition, TonicOption } from "../domain/types";
import { ExerciseNotation } from "./ExerciseNotation";

type Props = Readonly<{
  exercise: Exercise;
  scale: ScaleDefinition;
  ragas: readonly ScaleDefinition[];
  tonic: TonicOption;
  tempo: number;
  activeIndex: number;
  isPlaying: boolean;
  audioError: string | null;
  instrument: InstrumentId;
  isLoadingAudio: boolean;
  countInBeat: number | null;
  countInEnabled: boolean;
  isFullscreen: boolean;
  isFullscreenSupported: boolean;
  isTanpuraEnabled: boolean;
  tanpuraVolume: number;
  tanpuraError: string | null;
  onInstrumentChange: (instrument: InstrumentId) => void;
  onRagaChange: (raga: ScaleDefinition) => void;
  onTonicChange: (tonic: TonicOption) => void;
  onTempoChange: (tempo: number) => void;
  onCountInToggle: () => void;
  onFullscreenToggle: () => void;
  onTanpuraToggle: () => void;
  onTanpuraVolumeChange: (volume: number) => void;
  onPlayTone: (index: number) => void;
  onPlay: () => void;
  onStop: () => void;
}>;

export function PracticePanel({ exercise, scale, ragas, tonic, tempo, activeIndex, isPlaying, audioError, instrument, isLoadingAudio, countInBeat, countInEnabled, isFullscreen, isFullscreenSupported, isTanpuraEnabled, tanpuraVolume, tanpuraError, onInstrumentChange, onRagaChange, onTonicChange, onTempoChange, onCountInToggle, onFullscreenToggle, onTanpuraToggle, onTanpuraVolumeChange, onPlayTone, onPlay, onStop }: Props) {
  const instrumentName = INSTRUMENTS.find((item) => item.id === instrument)?.label ?? "Instrument";

  return (
    <div className="practicePanel">
      <div className="practiceHeader">
        <div>
          <p className="nowPlaying"><span aria-hidden="true" /> Now practising</p>
          <h2>{exercise.title}</h2>
          <p>{exercise.description}</p>
          <div className="exerciseMeta"><span>{exercise.status === "verified" ? "Verified curriculum" : "Prototype"}</span><span>{exercise.category}</span><span>{scale.name}</span><span>{exercise.sequence.length} beats</span></div>
        </div>
        <div className="practiceTools">
          <details className="settings">
            <summary>
              <span className="settingsSummary">
                <strong>Practice settings</strong>
                <small>{scale.name} · {instrumentName} · Sa {tonic.label} · {tempo} BPM</small>
              </span>
              <span className="settingsChevron" aria-hidden="true" />
            </summary>
            <div className="settingsPanel">
            {exercise.category === "Sarali" && <label className="ragaSetting"><span className="settingLabel">Raga</span>
              <select value={scale.id} onChange={(event) => onRagaChange(ragas.find((raga) => raga.id === event.target.value) ?? ragas[0])}>
                {ragas.map((raga) => <option key={raga.id} value={raga.id}>{raga.name}</option>)}
              </select>
            </label>}
            <label><span className="settingLabel">Instrument</span>
              <select value={instrument} onChange={(event) => onInstrumentChange(event.target.value as InstrumentId)}>
                {INSTRUMENTS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </select>
            </label>
            <label><span className="settingLabel">Sa pitch</span>
              <select value={tonic.label} onChange={(event) => onTonicChange(TONIC_OPTIONS.find((item) => item.label === event.target.value) ?? TONIC_OPTIONS[0])}>
                {TONIC_OPTIONS.map((item) => <option key={item.label}>{item.label}</option>)}
              </select>
            </label>
            <label className="tempoSetting"><span className="settingLabel">Tempo</span>
              <span className="tempoControl">
                <input aria-label="Tempo" aria-valuetext={`${tempo} beats per minute`} type="range" min="40" max="180" step="4" value={tempo} onChange={(event) => onTempoChange(Number(event.target.value))} />
                <b>{tempo} <small>BPM</small></b>
              </span>
            </label>
            <div className="countInSetting">
              <div>
                <span className="settingLabel">Count-in</span>
                <small>4 visual beats before play</small>
              </div>
              <button className={`settingSwitch${countInEnabled ? " active" : ""}`} type="button" role="switch" aria-checked={countInEnabled} onClick={onCountInToggle}>
                <span aria-hidden="true" />{countInEnabled ? "On" : "Off"}
              </button>
            </div>
            <div className="tanpuraSetting">
              <div>
                <span className="settingLabel">Tanpura drone</span>
                <small>{isTanpuraEnabled ? "Playing Pa–Sa–Sa–Sa" : "Follows your Sa pitch"}</small>
              </div>
              <button className={`settingSwitch${isTanpuraEnabled ? " active" : ""}`} type="button" role="switch" aria-checked={isTanpuraEnabled} onClick={onTanpuraToggle}>
                <span aria-hidden="true" />{isTanpuraEnabled ? "On" : "Off"}
              </button>
              <label className="tanpuraVolume"><span className="settingLabel">Drone volume</span>
                <span className="tempoControl">
                  <input aria-label="Tanpura volume" type="range" min="8" max="55" step="1" value={tanpuraVolume} onChange={(event) => onTanpuraVolumeChange(Number(event.target.value))} />
                  <b>{tanpuraVolume}<small>%</small></b>
                </span>
              </label>
            </div>
            </div>
          </details>
          {isFullscreenSupported && (
            <button className="fullscreenButton" type="button" onClick={onFullscreenToggle} aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"} title={isFullscreen ? "Exit full screen" : "Full screen"}>
              <span aria-hidden="true">{isFullscreen ? "×" : "⛶"}</span>
            </button>
          )}
        </div>
      </div>

      <div className="notationStage">
        <ExerciseNotation exercise={exercise} activeIndex={activeIndex} onPlayTone={onPlayTone} />
        {countInBeat !== null && (
          <div className="countInOverlay" role="status" aria-live="assertive" aria-label={`Starting in ${countInBeat}`}>
            <small>Get ready</small>
            <strong key={countInBeat}>{countInBeat}</strong>
          </div>
        )}
      </div>

      <div className="transport">
        <button className="restart" onClick={onStop} aria-label="Restart">↺</button>
        <button className="play" onClick={isPlaying ? onStop : onPlay}>
          <span className="playIcon" aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>{countInBeat !== null ? "Cancel count-in" : isPlaying ? "Pause practice" : "Play exercise"}
        </button>
        <p><i aria-hidden="true" /> Tap any swara to hear it</p>
      </div>
      <p className="audioStatus" role="status" aria-live="polite">
        {audioError ?? tanpuraError ?? (isLoadingAudio ? "Preparing instrument…" : "")}
      </p>
    </div>
  );
}
