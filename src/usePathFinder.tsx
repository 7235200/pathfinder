import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef
} from 'preact/hooks';
import Graph from './utils/graph';

const defaultFps = 60;

export const usePathFinder = (
  graph: Graph,
  color: string,
  input: string = '0,0',
  fps: number = defaultFps
) => {
  const timeouts = useRef<NodeJS.Timeout[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isDone, setIsDone] = useState<boolean>(false);

  const stop = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  }, []);

  const clear = useCallback(() => {
    setActiveId('');
  }, []);

  useEffect(() => {
    stop();
    clear();
  }, [graph]);

  const run = useCallback(() => {
    setIsDone(false);
    clear();
    const route = graph.dfs(input);
    if (!route) return;

    route.forEach((nodeId, idx) => {
      const t = setTimeout(() => {
        setActiveId(nodeId);
        if (!route[idx + 1]) setIsDone(true);
      }, fps * idx);

      timeouts.current.push(t);
    });
  }, [graph]);

  return {
    run,
    stop,
    activeId,
    color,
    isDone,
    clear
  };
};
