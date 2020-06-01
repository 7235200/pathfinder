import { h, Fragment } from 'preact';
import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef
} from 'preact/hooks';
import { memo } from 'preact/compat';

import Graph from './utils/graph';
import GridSource, { TGridInstance } from './utils/grid';
import Grid from './grid';

import { usePathFinder } from './usePathFinder';

const source = new GridSource(20, 20, 0.2, [0, 5, 10, 15]);

const App = () => {
  const [grid, setGrid] = useState(source.instance);
  const graph = useMemo(() => new Graph(grid), [grid]);

  const finder1 = usePathFinder(graph, 'red');
  const finder2 = usePathFinder(graph, 'blue', '5,0');
  const finder3 = usePathFinder(graph, 'orange', '10,0');

  const create = useCallback(() => {
    setGrid(source.createGrid());
  }, []);

  const run = useCallback(() => {
    finder1.run();
    finder2.run();
    finder3.run();
  }, []);

  const isDone = finder1.isDone || finder2.isDone || finder3.isDone;

  useEffect(() => {
    if (!isDone) return;
    finder1.stop();
    finder2.stop();
    finder3.stop();
  }, [isDone]);

  const finders = useMemo(() => ({
    [finder1.activeId]: finder1.color,
    [finder2.activeId]: finder2.color,
    [finder3.activeId]: finder3.color
  }), [finder1, finder2, finder3]);

  return (
    <Fragment>
      <button onClick={create}>generate</button>
      <button onClick={run}>run</button>

      <Grid source={grid} {...{ finders }} />
    </Fragment>
  );
};

export default memo(App);
