import { h, Fragment } from 'preact';
import { useState, useCallback, useEffect } from 'preact/hooks';
import { memo } from 'preact/compat';

import Graph from '~/utils/graph';
import Dfs from '~/utils/dfs';
import GridSource from '~/utils/grid';
import Grid from '~/grid';
import usePath from './usePath';

// genreate initial grid instance
// prettier-ignore
const source = new GridSource(
  10  /* width */,
  10  /* height */,
  0.2 /* proximity */,
  0   /* input index */,
  9   /* output index */
);

// set up the graph on the grid basis
const graph = new Graph(source.instance);

// calculate the shortest path
const dfs = new Dfs(
  graph.instance,
  '0,0' /* top left */,
  '9,10' /* bottom right */
);

const Root = () => {
  const [grid, setGrid] = useState(source.instance);
  const [path, setPath] = useState(dfs.instance);
  const { activeId, run } = usePath(path);

  useEffect(() => {
    graph.createFrom(grid);
    dfs.search(graph.instance);
    setPath(dfs.instance);
  }, [grid]);

  const createGrid = useCallback(() => {
    setGrid(source.createGrid());
  }, []);

  return (
    <Fragment>
      <button onClick={createGrid}>generate</button>
      <button onClick={run}>run</button>

      <Grid
        source={grid}
        inputCellId={dfs.input}
        outputCellId={dfs.output}
        activeCellId={activeId}
      />
    </Fragment>
  );
};

export default memo(Root);
