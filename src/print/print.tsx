import css from './styles.mod.css';
import { h, FunctionComponent as FC } from 'preact';
import { memo } from 'preact/compat';

import { TGraphInstance } from '~/utils/graph';

const Print: FC<{ graph: TGraphInstance }> = ({ graph }) => (
  <section className={css.container}>
    {Array.from(graph).map((node) => (
      <div key={node[0]}>
        {`[${node[0]}] => `}
        {Array.from(node[1]).map((step) => `[${step}] `)}
      </div>
    ))}
  </section>
);

export default memo(Print);
