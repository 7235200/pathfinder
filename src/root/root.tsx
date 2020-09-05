import css from './styles.mod.css';
import { h, FunctionComponent as FC } from 'preact';
import { memo, useEffect } from 'preact/compat';

import GridSource from '~/utils/grid';
import useGraph from '~/utils/useGraph';

import Button from '~/button';
import Grid from '~/grid';
import ManualPath, { useManualPath } from '~/manual';
import DfsPath, { useDfsPath } from '~/dfs';
import Legend from '~/legend';

// genreate initial grid instance
// prettier-ignore
const source = new GridSource(
  20   /* width */,
  20   /* height */,
  0.3  /* proximity */,
  0    /* input index */,
  20   /* output index */
);

const inputIdx = '0,0';
const outputIdx = '19,20';

const Root = () => {
  const graph = useGraph(source);
  const dfs = useDfsPath(graph.instance, inputIdx, outputIdx);
  const manual = useManualPath(graph.instance, inputIdx, outputIdx);

  useEffect(() => {
    // recreate graph until we have a way out
    if (!dfs.success) graph.create();
  }, [dfs.path]);

  return (
    <section className={css.container}>
      <Static>
        <Button children="Generate grid" onClick={graph.create} />
        <Legend
          title="manual"
          activeCellId={manual.activeIdx}
          currentStep={manual.currentStep}
        />
        <Legend
          title="dfs"
          activeCellId={dfs.activeIdx}
          currentStep={dfs.currentStep}
        >
          <p>the run starts as far as you make the first move</p>
          <Button children="run" onClick={dfs.run} />
          <Button children="stop" onClick={dfs.stop} />
        </Legend>
      </Static>

      <Grid
        source={source.instance}
        inputCellId={inputIdx}
        outputCellId={outputIdx}
      >
        <DfsPath path={dfs.path} activeIdx={dfs.activeIdx} {...{ outputIdx }} />
        <ManualPath
          path={manual.path}
          activeIdx={manual.activeIdx}
          onStart={dfs.run}
          {...{ outputIdx }}
        />
      </Grid>
    </section>
  );
};

export default memo(Root);

const Static: FC = ({ children }) => (
  <div className={css.static}>
    <h1>pathfinder</h1>
    <p>Find the shortest way from the top left to the bottom right.</p>
    {children}
  </div>
);
