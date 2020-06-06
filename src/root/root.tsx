import { h, Fragment } from 'preact';
import { useState, useCallback, useEffect } from 'preact/hooks';
import { memo } from 'preact/compat';

import Graph from '~/utils/graph';
import Dfs from '~/utils/dfs';
import GridSource from '~/utils/grid';
import Grid from '~/grid';
import Actions from '~/actions';
import Legend from '~/legend';
import usePath from './usePath';

// genreate initial grid instance
// prettier-ignore
const source = new GridSource(
  15  /* width */,
  15  /* height */,
  0.2 /* proximity */,
  0   /* input index */,
  15   /* output index */
);

// set up the graph on the grid basis
const graph = new Graph(source.instance);

// calculate the shortest path
const dfs = new Dfs(
  graph.instance,
  '0,0' /* top left */,
  '14,15' /* bottom right */
);

const Root = () => {
  const [grid, setGrid] = useState(source.instance);
  const [path, setPath] = useState(dfs.instance);
  const { activeId, currentStep, run } = usePath(path);

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
      <Actions onRun={run} onCreate={createGrid} />
      <Legend
        success={dfs.success}
        currentStep={currentStep}
        activeCellId={activeId}
      />
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
