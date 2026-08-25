const PLUCK_INTERVAL_MS = 1250;
const TANPURA_PATTERN = [1.5, 2, 2, 1] as const;

export class TanpuraDrone {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private activeOscillators = new Set<OscillatorNode>();
  private tonicHz = 261.63;
  private volume = 0.28;
  private patternIndex = 0;

  private getContext(): AudioContext {
    if (typeof window === "undefined" || !window.AudioContext) throw new Error("Tanpura audio is not supported in this browser");
    this.context ??= new window.AudioContext();
    if (!this.masterGain) {
      this.masterGain = this.context.createGain();
      this.masterGain.gain.value = this.volume;
      this.masterGain.connect(this.context.destination);
    }
    return this.context;
  }

  async start(tonicHz: number, volume: number): Promise<void> {
    this.stop();
    this.tonicHz = tonicHz;
    this.volume = volume;
    const context = this.getContext();
    if (context.state === "suspended") await context.resume();
    this.masterGain?.gain.setValueAtTime(volume, context.currentTime);
    this.patternIndex = 0;
    this.pluck();
    this.timer = setInterval(() => this.pluck(), PLUCK_INTERVAL_MS);
  }

  setTonic(tonicHz: number): void {
    this.tonicHz = tonicHz;
  }

  setVolume(volume: number): void {
    this.volume = volume;
    if (this.context && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(volume, this.context.currentTime, 0.04);
    }
  }

  private pluck(): void {
    const context = this.context;
    const output = this.masterGain;
    if (!context || !output || context.state === "closed") return;

    const frequency = this.tonicHz * TANPURA_PATTERN[this.patternIndex];
    this.patternIndex = (this.patternIndex + 1) % TANPURA_PATTERN.length;
    const now = context.currentTime;
    const voiceGain = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(Math.min(3400, frequency * 7), now);
    filter.Q.value = 0.7;
    voiceGain.gain.setValueAtTime(0.0001, now);
    voiceGain.gain.exponentialRampToValueAtTime(0.22, now + 0.018);
    voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
    filter.connect(voiceGain).connect(output);

    for (const [type, detune, level] of [["triangle", -3, 1], ["sine", 4, 0.46]] as const) {
      const oscillator = context.createOscillator();
      const partialGain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.detune.value = detune;
      partialGain.gain.value = level;
      oscillator.connect(partialGain).connect(filter);
      oscillator.addEventListener("ended", () => this.activeOscillators.delete(oscillator), { once: true });
      this.activeOscillators.add(oscillator);
      oscillator.start(now);
      oscillator.stop(now + 3.55);
    }
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    for (const oscillator of this.activeOscillators) {
      try { oscillator.stop(); } catch { /* It may have already ended. */ }
    }
    this.activeOscillators.clear();
  }

  async dispose(): Promise<void> {
    this.stop();
    if (this.context && this.context.state !== "closed") await this.context.close();
    this.context = null;
    this.masterGain = null;
  }
}
