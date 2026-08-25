"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TonePlayer, TonePlayerFactory } from "../audio/TonePlayer";
import { WebAudioTonePlayer } from "../audio/WebAudioTonePlayer";
import { beatDurationMs, frequencyForSwara } from "../domain/music";
import type { Exercise, ScaleDefinition } from "../domain/types";

const createWebAudioPlayer: TonePlayerFactory = () => new WebAudioTonePlayer();

type PlayerOptions = Readonly<{
  exercise: Exercise;
  scale: ScaleDefinition;
  bpm: number;
  tonicHz: number;
  countInBeats?: number;
  createTonePlayer?: TonePlayerFactory;
}>;

export function useExercisePlayer({ exercise, scale, bpm, tonicHz, countInBeats = 0, createTonePlayer }: PlayerOptions) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [countInBeat, setCountInBeat] = useState<number | null>(null);
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
    setCountInBeat(null);
  }, [clearTimer]);

  const playTone = useCallback(async (index: number, durationSeconds: number) => {
    const swara = exercise.sequence[index];
    if (!swara) return;
    setActiveIndex(index);
    setAudioError(null);
    setIsLoadingAudio(true);
    try {
      await getTonePlayer().play(frequencyForSwara(swara, tonicHz, scale), durationSeconds);
    } catch (error) {
      setAudioError(error instanceof Error ? error.message : "Audio playback failed");
      stop();
    } finally {
      setIsLoadingAudio(false);
    }
  }, [exercise.sequence, getTonePlayer, scale, stop, tonicHz]);

  const playToneAt = useCallback(async (index: number) => {
    const noteSeconds = Math.min(0.65, (beatDurationMs(bpm) / 1000) * 0.78);
    await playTone(index, noteSeconds);
  }, [bpm, playTone]);

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
      const isSustain = exercise.sustainAt?.includes(index) ?? false;
      if (isSustain) {
        setActiveIndex(index);
      } else {
        let heldBeats = 0;
        while (exercise.sustainAt?.includes(index + heldBeats + 1)) heldBeats += 1;
        await playTone(index, (beatMs / 1000) * (heldBeats + 1) * 0.9);
      }
      if (runVersion !== runVersionRef.current) return;
      timerRef.current = setTimeout(() => void step(index + 1), beatMs);
    };
    if (countInBeats > 0) {
      let remaining = countInBeats;
      setCountInBeat(remaining);
      const countDown = () => {
        if (runVersion !== runVersionRef.current) return;
        if (remaining === 1) {
          setCountInBeat(null);
          void step(0);
          return;
        }
        remaining -= 1;
        setCountInBeat(remaining);
        timerRef.current = setTimeout(countDown, beatMs);
      };
      timerRef.current = setTimeout(countDown, beatMs);
    } else {
      void step(0);
    }
  }, [bpm, countInBeats, exercise.sequence.length, exercise.sustainAt, playTone, stop]);

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

  return { activeIndex, audioError, countInBeat, isLoadingAudio, isPlaying, play, playToneAt, stop };
}
