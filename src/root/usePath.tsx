import { useState, useRef, useEffect } from 'preact/hooks';

const defaultFps = 120;

export default function usePath(path: string[] = [], fps: number = defaultFps) {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [activeId, setActiveId] = useState<string>(path[0]);

  const run = () => {
    stop();
    let idx = 0;

    interval.current = setInterval(() => {
      if (idx === path.length) stop();
      setActiveId(path[idx]);
      idx++;
    }, fps);
  };

  const stop = () => {
    if (!interval.current) return;
    clearInterval(interval.current);
    interval.current = null;
  };

  useEffect(() => {
    stop();
    setActiveId(path[0]);
  }, [path]);

  return { activeId, run, stop };
}
