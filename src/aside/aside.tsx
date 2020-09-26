import css from './aside.mod.css';
import { h, FunctionComponent as FC } from 'preact';
import { memo } from 'preact/compat';

import type { useManualPath } from '~/manual';

import Button from '~/button';
import Legend from '~/legend';
import usePath from '~/utils/usePath';

type TProps = {
  dfs: ReturnType<typeof usePath>;
  manual: ReturnType<typeof useManualPath>;
  create: () => void;
};

const Aside = ({ manual, dfs, create }: TProps) => (
  <Static>
    <Button onClick={create}>Generate grid</Button>
    <Legend
      title="manual"
      activeCellId={manual.activeCellId}
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
