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
  inputCellId: string;
  outputCellId: string;
  activeIdx: string;
};

const Wireframe: FC<TProps> = ({
  source,
  inputCellId,
  outputCellId,
  activeIdx,
  children,
}) => {
  const [inputX, inputY] = cellIdToChords(inputCellId);
  const [outputX, outputY] = cellIdToChords(outputCellId);

  return (
    <svg
      width={source[0].length * rem}
      height={source.length * rem}
      className={css.frame}
    >
      <Cell theme="io" x={inputX} y={inputY} isActive />
      {children}
      <GridCells {...{ source, activeIdx, outputCellId }} />
      <Cell theme="io" x={outputX} y={outputY} isActive />
    </svg>
  );
};

export default memo(Wireframe);
