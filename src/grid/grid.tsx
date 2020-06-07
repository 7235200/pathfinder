import css from './styles/grid.mod.css';
import { h, FunctionComponent as FC } from 'preact';
import { memo } from 'preact/compat';

import Cell from './cell';
import { TGridInstance } from '~/utils/grid';

const rem = 20;

type TProps = {
  path: Set<string>;
  isDone: boolean;
  activeCellId?: string;

  manualPath: Set<string>;
  manualIsDone: boolean;
  manualActiveId?: string;

  source: TGridInstance;
  inputCellId?: string;
  outputCellId?: string;
};

const GridCells: FC<TProps> = ({
  source,
  path,
  isDone,
  activeCellId,

  manualPath,
  manualActiveId,
  manualIsDone,

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

              isManualActive={id===manualActiveId}
              isManualVisited={manualIsDone && manualPath.has(id)}

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
