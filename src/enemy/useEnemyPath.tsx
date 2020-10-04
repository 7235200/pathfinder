import { useState, useRef, useEffect, useCallback } from 'preact/hooks';

const defaultFps = 5;

export default function useEnemyPath(
  path: Set<string>,
  cellIdToCatch: string,
  onCatch: () => void,
  fps: number = defaultFps
) {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const inputIdx = path.values().next().value;

  const [activeIdx, setActiveIdx] = useState<string>(inputIdx);

  useEffect(() => {
    if (activeIdx === cellIdToCatch) {
      stop();
      onCatch();
    }
  }, [activeIdx]);

  const reset = useCallback(() => {
    setActiveIdx(inputIdx);
  }, [inputIdx]);

  const stop = useCallback(() => {
    if (!interval.current) return;
    clearInterval(interval.current);
    interval.current = null;
  }, []);

  const run = useCallback(() => {
    const iterator = path.values();

    interval.current = setInterval(() => {
      // get the next cell item
      const nextIdx = iterator.next().value;

      if (!nextIdx) {
        // go backwards
        stop();
        path = new Set(Array.from(path).reverse());
        run();
      } else {
        // go to the next iteration
        setActiveIdx(nextIdx);
      }
    }, 1000 / fps);
  }, [fps, reset, path]);

  useEffect(() => {
    stop();
    reset();
    run();
  }, [path]);

  return { activeIdx, run, stop, path };
}
