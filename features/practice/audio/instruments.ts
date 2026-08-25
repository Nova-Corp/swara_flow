import { SampledTonePlayer, type SampleAnchor } from "./SampledTonePlayer";
import type { TonePlayerFactory } from "./TonePlayer";
import { WebAudioTonePlayer } from "./WebAudioTonePlayer";

export type InstrumentId = "tone" | "flute";

export const INSTRUMENTS: readonly Readonly<{ id: InstrumentId; label: string }>[] = [
  { id: "flute", label: "Flute" },
  { id: "tone", label: "Simple tone" },
];

const fluteSamples: readonly SampleAnchor[] = [
  { url: "/audio/flute/C4.wav", frequencyHz: 261.63 },
  { url: "/audio/flute/G4.wav", frequencyHz: 392 },
  { url: "/audio/flute/C5.wav", frequencyHz: 523.25 },
  { url: "/audio/flute/G5.wav", frequencyHz: 783.99 },
];

export const TONE_PLAYER_FACTORIES: Readonly<Record<InstrumentId, TonePlayerFactory>> = {
  tone: () => new WebAudioTonePlayer(),
  flute: () => new SampledTonePlayer(fluteSamples),
};
