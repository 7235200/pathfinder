import css from './styles/grid.mod.css';
import { h, FunctionComponent as FC } from 'preact';
import { memo } from 'preact/compat';

import Cell from './cell';
import { TGridInstance } from '~/utils/grid';

const rem = 20;

type TProps = {
  source: TGridInstance;
  isDone: boolean;
  path: Set<string>;
  inputCellId?: string;
  outputCellId?: string;
  activeCellId?: string;
};

const GridCells: FC<TProps> = ({
  source,
  isDone,
  path,
  activeCellId,
  inputCellId,
  outputCellId
}) => (
  <svg
    width={source[0].length * rem}
    height={source.length * rem}
    className={css.grid}
  >
    {// prettier-ignore
    source.map((height, y) => height.map((value, x) => {
          const id = chordsToId(x, y);

          return (
            <Cell
              key={id}
              {...{ x, y, rem }}
              isBlocked={Boolean(value)}
              isVisited={isDone && path.has(id)}
              isActive={id === activeCellId}
              isInput={id === inputCellId}
              isOutput={id === outputCellId}
            />
          );
        })
      )}
  </svg>
);

export default memo(GridCells);

export const chordsToId = (x: number, y: number) => `${x},${y}`;
