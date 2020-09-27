import css from './styles.mod.css';
import { h } from 'preact';
import { memo, useEffect, useState, useCallback } from 'preact/compat';

import Dfs from '~/utils/dfs';
import Grid from '~/grid';

import { useManualPath } from '~/manual';
import usePath from '~/utils/usePath';
import Aside from '~/aside';

const src = new Dfs(10, 0.3);

const useRerender = () => {
  const [_, setState] = useState({});
  return useCallback(() => {
    setState({});
  }, []);
};

const Root = () => {
  const rerender = useRerender();
  const manual = useManualPath(src.graph, src.inputCellId, src.outputCellId);
  const dfs = usePath(src.path);

  const create = async () => {
    await src.generate();
    rerender();
  };

  return (
    <section className={css.container}>
      <Aside {...{ dfs, manual, create }} />
      <Grid
        source={src.grid}
        {...{ manual, dfs }}
        outputCellId={src.outputCellId}
      />
    </section>
  );
};

export default memo(Root);
