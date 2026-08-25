import { SampledTonePlayer, type SampleAnchor } from "./SampledTonePlayer";
import type { TonePlayerFactory } from "./TonePlayer";
import { WebAudioTonePlayer } from "./WebAudioTonePlayer";

export type InstrumentId = "tone" | "flute" | "vocal";

export const INSTRUMENTS: readonly Readonly<{ id: InstrumentId; label: string }>[] = [
  { id: "flute", label: "Flute" },
  { id: "vocal", label: "Vocal · aa" },
  { id: "tone", label: "Simple tone" },
];

const fluteSamples: readonly SampleAnchor[] = [
  { url: "/audio/flute/C4.wav", frequencyHz: 261.63 },
  { url: "/audio/flute/G4.wav", frequencyHz: 392 },
  { url: "/audio/flute/C5.wav", frequencyHz: 523.25 },
  { url: "/audio/flute/G5.wav", frequencyHz: 783.99 },
];

const vocalSamples: readonly SampleAnchor[] = [
  { url: "/audio/vocal/source/C3.wav", frequencyHz: 130.81 },
  { url: "/audio/vocal/source/G3.wav", frequencyHz: 196 },
  { url: "/audio/vocal/source/B3.wav", frequencyHz: 246.94 },
  { url: "/audio/vocal/source/A4.wav", frequencyHz: 440 },
];

export const TONE_PLAYER_FACTORIES: Readonly<Record<InstrumentId, TonePlayerFactory>> = {
  tone: () => new WebAudioTonePlayer(),
  flute: () => new SampledTonePlayer(fluteSamples),
  vocal: () => new SampledTonePlayer(vocalSamples),
};
