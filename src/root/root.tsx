import css from './styles.mod.css';
import { h } from 'preact';
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
const source = new GridSource(
  25 /* width */,
  25 /* height */,
  0.3 /* proximity */,
  0 /* input index */,
  25 /* output index */
);

// set up the graph on the grid basis
const graph = new Graph(source.instance);

// calculate the shortest path
const dfs = new Dfs(
  graph.instance,
  '0,0' /* top left */,
  '24,25' /* bottom right */
);

const Root = () => {
  const [path, setPath] = useState(dfs.instance);
  const { activeId, currentStep, run } = usePath(path);

  const create = useCallback(() => {
    let success = false;
    let attempts = 5;

    while (!success && attempts > 0) {
      const grid = source.createGrid();
      graph.createFrom(grid);
      dfs.search(graph.instance);
      success = dfs.success;
      attempts--;
    }

    setPath(dfs.instance);
  }, []);

  return (
    <section className={css.container}>
      <Grid
        source={source.instance}
        inputCellId={dfs.input}
        outputCellId={dfs.output}
        activeCellId={activeId}
      />

      <div>
        <Actions onRun={run} onCreate={create} />
        <Legend
          success={dfs.success}
          currentStep={currentStep}
          activeCellId={activeId}
        />
      </div>
    </section>
  );
};

export default memo(Root);
