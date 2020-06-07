import css from './styles.mod.css';
import { h } from 'preact';
import { useState, useCallback, useMemo } from 'preact/hooks';
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
  15   /* width */,
  15   /* height */,
  0.3  /* proximity */,
  0    /* input index */,
  15   /* output index */
);

// set up the graph on the grid basis
const graph = new Graph(source.instance);

// calculate the shortest path
// prettier-ignore
const dfs = new Dfs(
  graph.instance,
  '0,0'   /* top left */,
  '14,15' /* bottom right */
);

// try 5 times to generate the grid with a proper way out
const createGridAttempts = 5;

const Root = () => {
  const [path, setPath] = useState(dfs.instance);
  const { activeId, currentStep, run, isDone } = usePath(path);

  const create = useCallback(() => {
    let success = false;
    let attempts = createGridAttempts;

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
        {...{ isDone, path }}
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
