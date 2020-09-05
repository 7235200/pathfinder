import css from './aside.mod.css';
import { h, FunctionComponent as FC } from 'preact';
import { memo } from 'preact/compat';

import type useGraph from '~/utils/useGraph';
import type { useDfsPath } from '~/dfs';
import type { useManualPath } from '~/manual';

import Button from '~/button';
import Legend from '~/legend';

type TProps = {
  graph: ReturnType<typeof useGraph>;
  dfs: ReturnType<typeof useDfsPath>;
  manual: ReturnType<typeof useManualPath>;
};

const Aside = ({ graph, manual, dfs }: TProps) => (
  <Static>
    <Button onClick={graph.create}>Generate grid</Button>
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
      <Button onClick={dfs.run}>run</Button>
      <Button onClick={dfs.stop}>stop</Button>
    </Legend>
  </Static>
);

export default memo(Aside);

const Static: FC = ({ children }) => (
  <div className={css.static}>
    <h1>pathfinder</h1>
    <p>Find the shortest way from the top left to the bottom right.</p>
    <p>The run starts as far as you make the first move</p>
    {children}
  </div>
);
