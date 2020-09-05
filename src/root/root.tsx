import css from './styles.mod.css';
import { h, FunctionComponent as FC } from 'preact';
import { memo, useEffect } from 'preact/compat';

import GridSource from '~/utils/grid';
import useGraph from '~/utils/useGraph';

import Grid from '~/grid';
import { useManualPath } from '~/manual';
import { useDfsPath } from '~/dfs';
import Aside from '~/aside';

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
      <Aside {...{ dfs, manual, graph }} />
      <Grid
        source={source.instance}
        {...{ inputIdx, outputIdx, dfs, manual }}
      />
    </section>
  );
};

export default memo(Root);
