import css from './styles.mod.css';
import { h, FunctionComponent as FC } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import { memo } from 'preact/compat';

import Graph from '~/utils/graph';
import Dfs from '~/utils/dfs';
import GridSource from '~/utils/grid';
import Grid from '~/grid';
import Print from '~/print';
import Actions from '~/actions';
import Legend from '~/legend';

import usePath from './usePath';
import useManualPath from './useManualPath';
// genreate initial grid instance
// prettier-ignore
const source = new GridSource(
  20   /* width */,
  20   /* height */,
  0.3  /* proximity */,
  0    /* input index */,
  20   /* output index */
);

// set up the graph on the grid basis
const graph = new Graph(source.instance);

// calculate the shortest path
const inputIndex = '0,0';
const outputIndex = '19,20';
const dfs = new Dfs(graph.instance, inputIndex, outputIndex);

// try 5 times to generate the grid with a proper way out
const createGridAttempts = 5;

const Root = () => {
  const [path, setPath] = useState(dfs.instance);
  const { activeId, currentStep, run, isDone } = usePath(path);

  const {
    activeId: manualActiveId,
    path: manualPath,
    isDone: isManualDone,
    currentStep: manualCurrentStep
  } = useManualPath(activeId, graph.instance, outputIndex);

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
      <Static>
        <Actions onRun={run} onCreate={create} />
        {!dfs.success && <p children="no way out" />}

        <p>use the keyboard to navigate through the grid</p>

        <Legend
          title="manual"
          currentStep={manualCurrentStep}
          activeCellId={manualActiveId}
        />

        <p>or trigger the dfs search</p>

        <Legend
          title="dfs"
          currentStep={currentStep}
          activeCellId={activeId}
        />
      </Static>

      <Grid
        {...{
          isDone,
          path,
          manualPath,
          manualActiveId
        }}
        manualIsDone={isManualDone}
        activeCellId={activeId}
        inputCellId={dfs.input}
        outputCellId={dfs.output}
        source={source.instance}
      />

      <Print graph={graph.instance} />
    </section>
  );
};

export default memo(Root);

const Static: FC = ({ children }) => (
  <div className={css.static}>
    <h1>pathfinder</h1>
    <p>find the shortest way from the top left to the bottom right</p>
    {children}
  </div>
);
