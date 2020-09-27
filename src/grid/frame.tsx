import css from './frame.mod.css';

import { h, FunctionComponent as FC } from 'preact';
import { memo } from 'preact/compat';

import { GridCells } from './common';
import Cell from './cell';
import { TGridInstance } from '~/utils/grid';
import { cellIdToChords } from './common';

const rem = 20;

type TProps = {
  source: TGridInstance;
  outputCellId: string;
  activeIdx: string;
};

const Wireframe: FC<TProps> = ({
  source,
  outputCellId,
  activeIdx,
  children,
}) => {
  const [outputX, outputY] = cellIdToChords(outputCellId);

  return (
    <svg
      width={source[0].length * rem}
      height={source.length * rem}
      className={css.frame}
    >
      <Cell theme="io" x={outputX} y={outputY} isActive />
      <GridCells {...{ source, activeIdx, outputCellId }} />
      {children}
    </svg>
  );
};

export default memo(Wireframe);
