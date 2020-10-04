import css from './frame.mod.css';

import { h, FunctionComponent as FC } from 'preact';
import { memo } from 'preact/compat';

import { GridCells } from './common';
import { TGridInstance } from '~/utils/grid';

// todo
const rem = 20;

type TProps = {
  source: TGridInstance;
  activeCellId: string;
  outputCellId: string;
};

const Wireframe: FC<TProps> = ({
  source,
  activeCellId,
  outputCellId,
  children,
}) => (
  <svg
    width={source[0].length * rem}
    height={source.length * rem}
    className={css.frame}
  >
    {children /** graph paths */}
    <GridCells {...{ source, activeCellId, outputCellId }} />
  </svg>
);

export default memo(Wireframe);
