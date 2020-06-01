import css from './styles.mod.css';
import { h, FunctionComponent } from 'preact';

import { TGridInstance } from '../utils/grid';
import { chordsToId, getPosition } from './common';

type TProps = {
  source: TGridInstance;
  finders: { [key: string]: string };
  activeCellId?: string;
};

const GridCells: FunctionComponent<TProps> = ({ source, finders }) => {
  return (
    <div className={css.container}>
      {/* prettier-ignore*/
      source.map((height, y) => height.map((value, x) => {
        return (
          <Cell
            id={chordsToId(x, y)}
            color={finders[chordsToId(x, y)]}
            isBlocked={Boolean(value)}
            {...{ x, y }}
          />
        )})
      )}
    </div>
  );
};

export default GridCells;

type TCellProps = {
  id: string;
  x: number;
  y: number;
  color?: string;
  isBlocked: boolean;
};

const Cell: FunctionComponent<TCellProps> = ({
  id,
  x,
  y,
  color = 'transparent',
  isBlocked
}) => (
  <div
    key={id}
    {...{ id }}
    style={getPosition(x, y, color)}
    data-blocked={isBlocked}
    className={css.node}
  />
);
