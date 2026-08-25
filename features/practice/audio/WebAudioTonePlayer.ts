import { TonePlayer } from "./TonePlayer";

export class WebAudioTonePlayer implements TonePlayer {
  private context: AudioContext | null = null;
  private activeOscillators = new Set<OscillatorNode>();

  private getContext(): AudioContext {
    if (typeof window === "undefined" || !window.AudioContext) throw new Error("Audio playback is not supported in this browser");
    this.context ??= new window.AudioContext();
    return this.context;
  }

  async play(frequencyHz: number, durationSeconds: number): Promise<void> {
    const context = this.getContext();
    if (context.state === "suspended") await context.resume();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequencyHz, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);
    oscillator.connect(gain).connect(context.destination);
    oscillator.addEventListener("ended", () => this.activeOscillators.delete(oscillator), { once: true });
    this.activeOscillators.add(oscillator);
    oscillator.start(now);
    oscillator.stop(now + durationSeconds + 0.02);
  }

  async dispose(): Promise<void> {
    this.stopAll();
    if (this.context && this.context.state !== "closed") await this.context.close();
    this.context = null;
  }

  stopAll(): void {
    for (const oscillator of this.activeOscillators) {
      try { oscillator.stop(); } catch { /* It may have already ended. */ }
    }
    this.activeOscillators.clear();
  }
}
