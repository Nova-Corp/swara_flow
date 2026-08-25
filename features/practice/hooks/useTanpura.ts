"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TanpuraDrone } from "../audio/TanpuraDrone";

export function useTanpura(tonicHz: number) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [volume, setVolumeState] = useState(28);
  const [error, setError] = useState<string | null>(null);
  const droneRef = useRef<TanpuraDrone | null>(null);

  const toggle = useCallback(async () => {
    const drone = droneRef.current ?? new TanpuraDrone();
    droneRef.current = drone;
    if (isEnabled) {
      drone.stop();
      setIsEnabled(false);
      return;
    }
    setError(null);
    try {
      await drone.start(tonicHz, volume / 100);
      setIsEnabled(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not start the tanpura");
      setIsEnabled(false);
    }
  }, [isEnabled, tonicHz, volume]);

  const setVolume = useCallback((nextVolume: number) => {
    setVolumeState(nextVolume);
    droneRef.current?.setVolume(nextVolume / 100);
  }, []);

  useEffect(() => { droneRef.current?.setTonic(tonicHz); }, [tonicHz]);
  useEffect(() => () => {
    const drone = droneRef.current;
    droneRef.current = null;
    void drone?.dispose();
  }, []);

  return { error, isEnabled, toggle, volume, setVolume };
}
