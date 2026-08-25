"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TonePlayer, TonePlayerFactory } from "../audio/TonePlayer";
import { WebAudioTonePlayer } from "../audio/WebAudioTonePlayer";
import { beatDurationMs, frequencyForSwara } from "../domain/music";
import type { Exercise } from "../domain/types";

const createWebAudioPlayer: TonePlayerFactory = () => new WebAudioTonePlayer();

type PlayerOptions = Readonly<{
  exercise: Exercise;
  bpm: number;
  tonicHz: number;
  createTonePlayer?: TonePlayerFactory;
}>;

export function useExercisePlayer({ exercise, bpm, tonicHz, createTonePlayer }: PlayerOptions) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runVersionRef = useRef(0);
  const tonePlayerRef = useRef<TonePlayer | null>(null);
  const playerFactory = createTonePlayer ?? createWebAudioPlayer;

  const getTonePlayer = useCallback(() => {
    tonePlayerRef.current ??= playerFactory();
    return tonePlayerRef.current;
  }, [playerFactory]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const stop = useCallback(() => {
    runVersionRef.current += 1;
    clearTimer();
    tonePlayerRef.current?.stopAll();
    setIsPlaying(false);
    setActiveIndex(-1);
  }, [clearTimer]);

  const playToneAt = useCallback(async (index: number) => {
    const swara = exercise.sequence[index];
    if (!swara) return;
    setActiveIndex(index);
    setAudioError(null);
    setIsLoadingAudio(true);
    try {
      const noteSeconds = Math.min(0.65, (beatDurationMs(bpm) / 1000) * 0.78);
      await getTonePlayer().play(frequencyForSwara(swara, tonicHz), noteSeconds);
    } catch (error) {
      setAudioError(error instanceof Error ? error.message : "Audio playback failed");
      stop();
    } finally {
      setIsLoadingAudio(false);
    }
  }, [bpm, exercise.sequence, getTonePlayer, stop, tonicHz]);

  const play = useCallback(() => {
    stop();
    const runVersion = runVersionRef.current;
    const beatMs = beatDurationMs(bpm);
    setIsPlaying(true);

    const step = async (index: number) => {
      if (runVersion !== runVersionRef.current) return;
      if (index >= exercise.sequence.length) {
        setIsPlaying(false);
        setActiveIndex(-1);
        return;
      }
      await playToneAt(index);
      if (runVersion !== runVersionRef.current) return;
      timerRef.current = setTimeout(() => void step(index + 1), beatMs);
    };
    void step(0);
  }, [bpm, exercise.sequence.length, playToneAt, stop]);

  useEffect(() => stop(), [exercise.id, stop]);
  useEffect(() => {
    stop();
    const previousPlayer = tonePlayerRef.current;
    tonePlayerRef.current = null;
    void previousPlayer?.dispose();
  }, [playerFactory, stop]);
  useEffect(() => () => {
    runVersionRef.current += 1;
    clearTimer();
    void tonePlayerRef.current?.dispose();
  }, [clearTimer]);

  return { activeIndex, audioError, isLoadingAudio, isPlaying, play, playToneAt, stop };
}
