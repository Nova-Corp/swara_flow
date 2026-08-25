import type { TonePlayer } from "./TonePlayer";

export type SampleAnchor = Readonly<{
  url: string;
  frequencyHz: number;
}>;

export function selectNearestSample(samples: readonly SampleAnchor[], targetHz: number): SampleAnchor {
  if (samples.length === 0) throw new Error("A sampled instrument requires at least one sample");
  return samples.reduce((nearest, candidate) => {
    const nearestDistance = Math.abs(Math.log2(targetHz / nearest.frequencyHz));
    const candidateDistance = Math.abs(Math.log2(targetHz / candidate.frequencyHz));
    return candidateDistance < nearestDistance ? candidate : nearest;
  });
}

export class SampledTonePlayer implements TonePlayer {
  private context: AudioContext | null = null;
  private buffers = new Map<string, Promise<AudioBuffer>>();
  private activeSources = new Set<AudioBufferSourceNode>();
  private disposed = false;

  constructor(private readonly samples: readonly SampleAnchor[]) {}

  private getContext(): AudioContext {
    if (this.disposed) throw new Error("Instrument player has been disposed");
    if (typeof window === "undefined" || !window.AudioContext) throw new Error("Audio playback is not supported in this browser");
    this.context ??= new window.AudioContext();
    return this.context;
  }

  private loadBuffer(sample: SampleAnchor): Promise<AudioBuffer> {
    const existing = this.buffers.get(sample.url);
    if (existing) return existing;

    const context = this.getContext();
    const request = fetch(sample.url)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load instrument sample (${response.status})`);
        return response.arrayBuffer();
      })
      .then((data) => context.decodeAudioData(data))
      .catch((error) => {
        this.buffers.delete(sample.url);
        throw error;
      });
    this.buffers.set(sample.url, request);
    return request;
  }

  async play(frequencyHz: number, durationSeconds: number): Promise<void> {
    const context = this.getContext();
    if (context.state === "suspended") await context.resume();

    const sample = selectNearestSample(this.samples, frequencyHz);
    const buffer = await this.loadBuffer(sample);
    if (this.disposed || context.state === "closed") return;
    const source = context.createBufferSource();
    const gain = context.createGain();
    const playbackRate = frequencyHz / sample.frequencyHz;
    const playableDuration = Math.min(durationSeconds, buffer.duration / playbackRate);
    const now = context.currentTime;

    source.buffer = buffer;
    source.playbackRate.setValueAtTime(playbackRate, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.34, now + 0.025);
    gain.gain.setValueAtTime(0.34, now + Math.max(0.03, playableDuration - 0.06));
    gain.gain.exponentialRampToValueAtTime(0.0001, now + playableDuration);
    source.connect(gain).connect(context.destination);
    source.addEventListener("ended", () => this.activeSources.delete(source), { once: true });
    this.activeSources.add(source);
    source.start(now);
    source.stop(now + playableDuration + 0.01);
  }

  stopAll(): void {
    for (const source of this.activeSources) {
      try { source.stop(); } catch { /* It may have already ended. */ }
    }
    this.activeSources.clear();
  }

  async dispose(): Promise<void> {
    this.disposed = true;
    this.stopAll();
    this.buffers.clear();
    if (this.context && this.context.state !== "closed") await this.context.close();
    this.context = null;
  }
}
