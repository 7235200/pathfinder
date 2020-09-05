import { useState, useRef, useEffect, useCallback } from 'preact/hooks';

const defaultFps = 15;

export default function usePath(path: Set<string>, fps: number = defaultFps) {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const inputIdx = path.values().next().value;

  const [activeIdx, setActiveIdx] = useState<string>(inputIdx);
  const [currentStep, setStep] = useState<number>(0);

  const reset = useCallback(() => {
    setStep(0);
    setActiveIdx(inputIdx);
  }, [inputIdx]);

  const stop = useCallback(() => {
    if (!interval.current) return;
    clearInterval(interval.current);
    interval.current = null;
  }, []);

  const run = useCallback(() => {
    // reset everything on the first iteration
    stop();
    reset();
    const iterator = path.values();

    interval.current = setInterval(() => {
      // get the next cell item
      const nextIdx = iterator.next().value;
      setStep((i) => ++i);

      // quit the interval if there is no next item
      if (!nextIdx) {
        stop();
      } else {
        // go to the next iteration
        setActiveIdx(nextIdx);
      }
    }, 1000 / fps);
  }, [fps, reset, path]);

  useEffect(() => {
    stop();
    reset();
  }, [path]);

  return { activeIdx, currentStep, run, stop };
}
