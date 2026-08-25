"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { exercises, swaraSemitones } from "./data";

const categories = ["All", "Sarali", "Janta", "Alankaram", "Pyramid"] as const;
const saOptions = [
  { label: "C", hz: 261.63 },
  { label: "C♯", hz: 277.18 },
  { label: "D", hz: 293.66 },
  { label: "D♯", hz: 311.13 },
  { label: "E", hz: 329.63 },
  { label: "F", hz: 349.23 },
  { label: "F♯", hz: 369.99 },
  { label: "G", hz: 392 },
];

export default function Home() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [exerciseId, setExerciseId] = useState(exercises[0].id);
  const [tempo, setTempo] = useState(72);
  const [sa, setSa] = useState(saOptions[0]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  const filtered = useMemo(
    () => exercises.filter((item) => category === "All" || item.category === category),
    [category],
  );
  const selected = exercises.find((item) => item.id === exerciseId) ?? exercises[0];

  useEffect(() => {
    if (!filtered.some((item) => item.id === exerciseId)) setExerciseId(filtered[0].id);
  }, [category, exerciseId, filtered]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    void audioRef.current?.close();
  }, []);

  function playTone(swara: string, duration = 0.42) {
    const AudioContextClass = window.AudioContext;
    if (!audioRef.current) audioRef.current = new AudioContextClass();
    const context = audioRef.current;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const frequency = sa.hz * 2 ** ((swaraSemitones[swara] ?? 0) / 12);

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration + 0.02);
  }

  function stop() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setPlaying(false);
    setActiveIndex(-1);
  }

  function playSequence(index = 0) {
    if (index >= selected.sequence.length) {
      setPlaying(false);
      setActiveIndex(-1);
      return;
    }
    setPlaying(true);
    setActiveIndex(index);
    const beatMs = 60_000 / tempo;
    playTone(selected.sequence[index], Math.min(0.65, beatMs / 1000 * 0.78));
    timerRef.current = setTimeout(() => playSequence(index + 1), beatMs);
  }

  function togglePlayback() {
    if (playing) stop();
    else playSequence();
  }

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Swara Flow home">
          <span className="brandMark" aria-hidden="true">S</span>
          <span>swara flow</span>
        </a>
        <span className="openSource">open-source practice room</span>
      </header>

      <section className="hero" id="top">
        <div>
          <p className="eyebrow">Carnatic practice, made visible</p>
          <h1>Find your flow.<br />One swara at a time.</h1>
          <p className="intro">Build clarity, breath and speed with guided exercises made for everyday Carnatic practice.</p>
        </div>
        <div className="heroGlyph" aria-hidden="true">
          <span>S</span><i /><span>R</span><i /><span>G</span><i /><span>M</span>
        </div>
      </section>

      <section className="workspace" aria-label="Practice workspace">
        <aside className="library">
          <div className="sectionHeading">
            <p>Exercise library</p>
            <span>{filtered.length} patterns</span>
          </div>
          <div className="filters" aria-label="Filter exercises">
            {categories.map((item) => (
              <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          <div className="exerciseList">
            {filtered.map((item, index) => (
              <button
                className={`exerciseCard ${selected.id === item.id ? "selected" : ""}`}
                key={item.id}
                onClick={() => { stop(); setExerciseId(item.id); }}
              >
                <span className="exerciseNumber">{String(index + 1).padStart(2, "0")}</span>
                <span><strong>{item.title}</strong><small>{item.description}</small></span>
                <span className="arrow">↗</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="practicePanel">
          <div className="practiceHeader">
            <div>
              <p className="eyebrow">Now practising · {selected.category} · Mayamalavagowla</p>
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
            </div>
            <div className="settings">
              <label>Sa
                <select value={sa.label} onChange={(event) => setSa(saOptions.find((item) => item.label === event.target.value) ?? saOptions[0])}>
                  {saOptions.map((item) => <option key={item.label}>{item.label}</option>)}
                </select>
              </label>
              <label>Tempo
                <span><input type="range" min="40" max="180" step="4" value={tempo} onChange={(event) => setTempo(Number(event.target.value))} /> <b>{tempo}</b></span>
              </label>
            </div>
          </div>

          <div className="notation" aria-label={`${selected.title} notation`}>
            {selected.sequence.map((swara, index) => (
              <button
                className={activeIndex === index ? "current" : activeIndex > index ? "passed" : ""}
                key={`${swara}-${index}`}
                onClick={() => { setActiveIndex(index); playTone(swara); }}
                aria-label={`Play ${swara}`}
              >
                <span>{swara}</span>
                <i />
              </button>
            ))}
          </div>

          <div className="transport">
            <button className="restart" onClick={() => { stop(); setActiveIndex(0); }} aria-label="Restart">↺</button>
            <button className="play" onClick={togglePlayback}>{playing ? "Pause" : "Play exercise"}<span>{playing ? "Ⅱ" : "▶"}</span></button>
            <p>Tap any swara to hear it</p>
          </div>
        </div>
      </section>

      <footer>
        <p>Made for patient practice.</p>
        <p>Swara Flow · Free and open source</p>
      </footer>
    </main>
  );
}
