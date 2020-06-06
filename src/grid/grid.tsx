import css from './styles/grid.mod.css';
import { h, FunctionComponent } from 'preact';
import { memo } from 'preact/compat';

import Cell from './cell';
import { TGridInstance } from '~/utils/grid';
import { chordsToId } from './common';

type TProps = {
  source: TGridInstance;
  inputCellId?: string;
  outputCellId?: string;
  activeCellId?: string;
};

const GridCells: FunctionComponent<TProps> = ({
  source,
  activeCellId,
  inputCellId,
  outputCellId
}) => {
  return (
    <div className={css.container}>
      {/* prettier-ignore*/
      source.map((height, y) => height.map((value, x) => {
        const id = chordsToId(x, y);

        return (
          <Cell
            {...{ x, y, id }}
            isBlocked={Boolean(value)}
            isActive={id === activeCellId}
            isInput={id === inputCellId}
            isOutput={id === outputCellId}
          />
        )})
      )}
    </div>
  );
};

export default memo(GridCells);
