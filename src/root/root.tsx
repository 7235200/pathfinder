import css from './styles.mod.css';
import { h, FunctionComponent as FC } from 'preact';
import { memo } from 'preact/compat';

import GridSource from '~/utils/grid';
import useGraph from '~/utils/useGraph';

import Grid from '~/grid';
import Actions from '~/actions';
import ManualPath from '~/manual';
import DfsPath, { useDfsPath } from '~/dfs';

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

  return (
    <section className={css.container}>
      <Static>
        <Actions onRun={dfs.run} onCreate={graph.create} />
        {!dfs.success && <p children="no way out" />}
      </Static>

      <Grid
        source={source.instance}
        inputCellId={inputIdx}
        outputCellId={outputIdx}
      >
        <DfsPath path={dfs.path} activeIdx={dfs.activeIdx} {...{ outputIdx }} />
        <ManualPath graph={graph.instance} {...{ inputIdx, outputIdx }} />
      </Grid>
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
