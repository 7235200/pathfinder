import { useState, useRef, useEffect, useCallback } from 'preact/hooks';

const defaultFps = 15;

export default function usePath(path: Set<string>, fps: number = defaultFps) {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const inputCellId = path.values().next().value;

  const [activeId, setActiveId] = useState<string>(inputCellId);
  const [currentStep, setStep] = useState<number>(0);
  const [isDone, done] = useState<boolean>(false);

  const reset = useCallback(() => {
    setStep(0);
    setActiveId(inputCellId);
    done(false);
  }, [inputCellId]);

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
      const nextCell = iterator.next().value;

      // quit the interval if there is no next item
      if (!nextCell) {
        done(true);
        stop();
      }

      // go to next iteration
      setActiveId(nextCell);
      setStep(i => ++i);
    }, 1000 / fps);
  }, [fps, reset, path]);

  useEffect(() => {
    stop();
    reset();
  }, [path]);

  return { activeId, currentStep, run, stop, isDone };
}
