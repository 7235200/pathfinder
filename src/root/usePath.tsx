import { useState, useRef, useEffect, useCallback } from 'preact/hooks';

const defaultFps = 120;

export default function usePath(path: string[] = [], fps: number = defaultFps) {
  const interval = useRef<NodeJS.Timeout | null>(null);

  const [activeId, setActiveId] = useState<string>(path[0]);
  const [currentStep, setStep] = useState<number>(0);

  const reset = useCallback(() => {
    setStep(0);
    setActiveId(path[0]);
  }, [path[0]]);

  const stop = useCallback(() => {
    if (!interval.current) return;
    clearInterval(interval.current);
    interval.current = null;
  }, []);

  const run = useCallback(() => {
    stop();
    reset();
    let idx = 0;

    interval.current = setInterval(() => {
      if (idx === path.length - 1) stop();
      setActiveId(path[idx]);
      idx++;
      setStep(i => ++i);
    }, fps);
  }, [fps, reset, path]);

  useEffect(() => {
    stop();
    reset();
  }, [path]);

  return { activeId, currentStep, run, stop };
}
