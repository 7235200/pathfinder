import { TGridInstance } from '~/utils/grid';
import { useState, useCallback, useRef, useEffect } from 'preact/hooks';
import Graph from '~/utils/graph';

export default function useGraph(grid: TGridInstance) {
  const { current: graph } = useRef(new Graph(grid));
  const [instance, setInstance] = useState(graph.instance);

  useEffect(() => {
    setInstance(graph.createFrom(grid));
  }, [grid]);

  return { instance };
}
