import { useEffect, useRef, useState } from "react";
import { TONIC_OPTIONS } from "../domain/catalog";
import { INSTRUMENTS, type InstrumentId } from "../audio/instruments";
import type { Exercise, ScaleDefinition, TonicOption } from "../domain/types";
import { TRADITIONAL_SPEEDS, type TraditionalSpeed } from "../domain/music";
import { ExerciseNotation } from "./ExerciseNotation";
import { SwaraSthanaMap } from "./SwaraSthanaMap";
import { CATEGORY_TAMIL, exerciseDescriptionTamil, exerciseTitleTamil, type Language } from "../../i18n/language";

type Props = Readonly<{
  language: Language;
  exercise: Exercise;
  scale: ScaleDefinition;
  ragas: readonly ScaleDefinition[];
  tonic: TonicOption;
  speed: TraditionalSpeed;
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
  onSpeedChange: (speed: TraditionalSpeed) => void;
  onCountInToggle: () => void;
  onFullscreenToggle: () => void;
  onTanpuraToggle: () => void;
  onTanpuraVolumeChange: (volume: number) => void;
  onPlayTone: (index: number) => void;
  onPlay: () => void;
  onStop: () => void;
}>;

export function PracticePanel({ language, exercise, scale, ragas, tonic, speed, activeIndex, isPlaying, audioError, instrument, isLoadingAudio, countInBeat, countInEnabled, isFullscreen, isFullscreenSupported, isTanpuraEnabled, tanpuraVolume, tanpuraError, onInstrumentChange, onRagaChange, onTonicChange, onSpeedChange, onCountInToggle, onFullscreenToggle, onTanpuraToggle, onTanpuraVolumeChange, onPlayTone, onPlay, onStop }: Props) {
  const settingsRef = useRef<HTMLDetailsElement | null>(null);
  const [practiceView, setPracticeView] = useState<"notation" | "sthana">("notation");
  const isTamil = language === "ta";
  const instrumentName = INSTRUMENTS.find((item) => item.id === instrument)?.label ?? "Instrument";
  const localizedInstrumentName = isTamil ? (instrument === "flute" ? "புல்லாங்குழல்" : "எளிய ஒலி") : instrumentName;
  const localizedScaleName = isTamil ? (scale.id === "mayamalavagowla" ? "மாயாமாளவகௌளை" : "ஹரிகாம்போஜி") : scale.name;
  const speedNames = isTamil ? ["முதல் காலம்", "இரண்டாம் காலம்", "மூன்றாம் காலம்"] : ["First speed", "Second speed", "Third speed"];

  useEffect(() => {
    function closeSettings(event: PointerEvent) {
      const settings = settingsRef.current;
      if (settings?.open && event.target instanceof Node && !settings.contains(event.target)) settings.open = false;
    }
    document.addEventListener("pointerdown", closeSettings);
    return () => document.removeEventListener("pointerdown", closeSettings);
  }, []);

  return (
    <div className="practicePanel">
      <div className="practiceHeader">
        <div>
          <p className="nowPlaying"><span aria-hidden="true" /> {isTamil ? "இப்போது பயிற்சி" : "Now practising"}</p>
          <h2>{isTamil ? exerciseTitleTamil(exercise.id, exercise.title) : exercise.title}</h2>
          <p>{isTamil ? exerciseDescriptionTamil(exercise.id, exercise.description) : exercise.description}</p>
        </div>
        <div className="practiceTools">
          <details className="settings" ref={settingsRef}>
            <summary>
              <span className="settingsSummary">
                <strong>{isTamil ? "பயிற்சி அமைப்புகள்" : "Practice settings"}</strong>
                <small>{localizedScaleName} · {localizedInstrumentName} · {isTamil ? "ச" : "Sa"} {tonic.label} · {speedNames[speed - 1]}</small>
              </span>
              <span className="settingsChevron" aria-hidden="true" />
            </summary>
            <div className="settingsPanel">
            {exercise.category === "Sarali" && <label className="ragaSetting"><span className="settingLabel">{isTamil ? "ராகம்" : "Raga"}</span>
              <select value={scale.id} onChange={(event) => onRagaChange(ragas.find((raga) => raga.id === event.target.value) ?? ragas[0])}>
                {ragas.map((raga) => <option key={raga.id} value={raga.id}>{isTamil ? (raga.id === "mayamalavagowla" ? "மாயாமாளவகௌளை" : "ஹரிகாம்போஜி") : raga.name}</option>)}
              </select>
            </label>}
            <label><span className="settingLabel">{isTamil ? "இசைக்கருவி" : "Instrument"}</span>
              <select value={instrument} onChange={(event) => onInstrumentChange(event.target.value as InstrumentId)}>
                {INSTRUMENTS.map((item) => <option key={item.id} value={item.id}>{isTamil ? (item.id === "flute" ? "புல்லாங்குழல்" : "எளிய ஒலி") : item.label}</option>)}
              </select>
            </label>
            <label><span className="settingLabel">{isTamil ? "ச சுருதி" : "Sa pitch"}</span>
              <select value={tonic.label} onChange={(event) => onTonicChange(TONIC_OPTIONS.find((item) => item.label === event.target.value) ?? TONIC_OPTIONS[0])}>
                {TONIC_OPTIONS.map((item) => <option key={item.label}>{item.label}</option>)}
              </select>
            </label>
            <div className="countInSetting">
              <div>
                <span className="settingLabel">{isTamil ? "தொடக்க எண்ணிக்கை" : "Count-in"}</span>
                <small>{isTamil ? "இசைக்கு முன் ஒலியுடன் 4 எண்ணிக்கைகள்" : "4 audible beats before play"}</small>
              </div>
              <button className={`settingSwitch${countInEnabled ? " active" : ""}`} type="button" role="switch" aria-checked={countInEnabled} onClick={onCountInToggle}>
                <span aria-hidden="true" />{isTamil ? (countInEnabled ? "ஆம்" : "இல்லை") : (countInEnabled ? "On" : "Off")}
              </button>
            </div>
            <div className="tanpuraSetting">
              <div>
                <span className="settingLabel">{isTamil ? "தம்பூரா சுருதி" : "Tanpura drone"}</span>
                <small>{isTamil ? (isTanpuraEnabled ? "ப–ச–ச–ச ஒலிக்கிறது" : "உங்கள் ச சுருதியைப் பின்பற்றும்") : (isTanpuraEnabled ? "Playing Pa–Sa–Sa–Sa" : "Follows your Sa pitch")}</small>
              </div>
              <button className={`settingSwitch${isTanpuraEnabled ? " active" : ""}`} type="button" role="switch" aria-checked={isTanpuraEnabled} onClick={onTanpuraToggle}>
                <span aria-hidden="true" />{isTamil ? (isTanpuraEnabled ? "ஆம்" : "இல்லை") : (isTanpuraEnabled ? "On" : "Off")}
              </button>
              <label className="tanpuraVolume"><span className="settingLabel">{isTamil ? "தம்பூரா ஒலி அளவு" : "Drone volume"}</span>
                <span className="tempoControl">
                  <input aria-label="Tanpura volume" type="range" min="8" max="55" step="1" value={tanpuraVolume} onChange={(event) => onTanpuraVolumeChange(Number(event.target.value))} />
                  <b>{tanpuraVolume}<small>%</small></b>
                </span>
              </label>
            </div>
            </div>
          </details>
          {isFullscreenSupported && (
            <button className="fullscreenButton" type="button" onClick={onFullscreenToggle} aria-label={isTamil ? (isFullscreen ? "முழுத்திரையிலிருந்து வெளியேறு" : "முழுத்திரைக்குச் செல்") : (isFullscreen ? "Exit full screen" : "Enter full screen")} title={isTamil ? (isFullscreen ? "முழுத்திரையிலிருந்து வெளியேறு" : "முழுத்திரை") : (isFullscreen ? "Exit full screen" : "Full screen")}>
              <span aria-hidden="true">{isFullscreen ? "×" : "⛶"}</span>
            </button>
          )}
        </div>
        <div className="practiceMetaRow">
          <div className="exerciseMeta"><span>{isTamil ? (exercise.status === "verified" ? "தொடக்கப் பாடத்திட்டம்" : "முன்மாதிரி") : (exercise.status === "verified" ? "Beginner curriculum" : "Prototype")}</span><span>{isTamil ? CATEGORY_TAMIL[exercise.category] : exercise.category}</span><span>{localizedScaleName}</span><span>{exercise.sequence.length} {isTamil ? "தாளங்கள்" : "beats"}</span></div>
          <div className="notationViewSwitch" role="tablist" aria-label={isTamil ? "பயிற்சி காட்சி" : "Practice view"}>
            <button type="button" role="tab" aria-selected={practiceView === "notation"} className={practiceView === "notation" ? "active" : ""} onClick={() => setPracticeView("notation")}>{isTamil ? "ஸ்வரக் குறியீடு" : "Notation"}</button>
            <button type="button" role="tab" aria-selected={practiceView === "sthana"} className={practiceView === "sthana" ? "active" : ""} onClick={() => setPracticeView("sthana")}>{isTamil ? "ஸ்வர ஸ்தானம்" : "Swara sthana"}</button>
          </div>
        </div>
      </div>

      <div className="notationStage">
        <div className="notationViewport">
          <div className="notationViewPanel" role="tabpanel">
            {practiceView === "notation"
              ? <ExerciseNotation exercise={exercise} activeIndex={activeIndex} onPlayTone={onPlayTone} />
              : <SwaraSthanaMap activeIndex={activeIndex} exercise={exercise} language={language} scale={scale} tonic={tonic} />}
          </div>
        </div>
        {countInBeat !== null && (
          <div className="countInOverlay" role="status" aria-live="assertive" aria-label={`Starting in ${countInBeat}`}>
            <small>{isTamil ? "தயாராகுங்கள்" : "Get ready"}</small>
            <strong key={countInBeat}>{countInBeat}</strong>
          </div>
        )}
      </div>

      <div className="transport">
        <button className="restart" onClick={onStop} aria-label={isTamil ? "மீண்டும் தொடங்கு" : "Restart"}>↺</button>
        <button className="play" onClick={isPlaying ? onStop : onPlay}>
          <span className="playIcon" aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>{isTamil ? (countInBeat !== null ? "எண்ணிக்கையை நிறுத்து" : isPlaying ? "பயிற்சியை இடைநிறுத்து" : "பயிற்சியை இயக்கு") : (countInBeat !== null ? "Cancel count-in" : isPlaying ? "Pause practice" : "Play exercise")}
        </button>
        <div className="transportSpeed" role="group" aria-label={isTamil ? "பாரம்பரிய காலம்" : "Traditional speed"}>
          <span>{isTamil ? "காலம்" : "Speed"}</span>
          {TRADITIONAL_SPEEDS.map((item) => (
            <button
              className={speed === item ? "active" : ""}
              type="button"
              aria-label={`${speedNames[item - 1]} · ${2 ** (item - 1)} ${isTamil ? "ஸ்வரம் ஒரு தாளத்திற்கு" : `swara${item === 1 ? "" : "s"} per beat`}`}
              aria-pressed={speed === item}
              title={speedNames[item - 1]}
              key={item}
              onClick={() => onSpeedChange(item)}
            >{item}</button>
          ))}
        </div>
        <p><i aria-hidden="true" /> {isTamil ? "கேட்க எந்த ஸ்வரத்தையும் தொடுங்கள்" : "Tap any swara to hear it"}</p>
      </div>
      <p className="audioStatus" role="status" aria-live="polite">
        {audioError ?? tanpuraError ?? (isLoadingAudio ? (isTamil ? "இசைக்கருவி தயாராகிறது…" : "Preparing instrument…") : "")}
      </p>
    </div>
  );
}
