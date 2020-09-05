import type GridSource from '~/utils/grid';
import { useState, useCallback, useRef } from 'preact/hooks';
import Graph from '~/utils/graph';

export default function useGraph(source: GridSource) {
  const { current: graph } = useRef(new Graph(source.instance));
  const [instance, setInstance] = useState(graph.instance);

  const create = useCallback(() => {
    const grid = source.createGrid();
    graph.createFrom(grid);
    setInstance(graph.instance);
  }, []);

  return { instance, create };
}
