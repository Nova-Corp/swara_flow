export interface TonePlayer {
  play(frequencyHz: number, durationSeconds: number): Promise<void>;
  stopAll(): void;
  dispose(): Promise<void>;
}

export type TonePlayerFactory = () => TonePlayer;
