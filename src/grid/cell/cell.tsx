import css from './cell.mod.css';
import { h, FunctionComponent as FC } from 'preact';

export type TCellTheme = 'manual' | 'dfs' | 'io' | 'grid';

type TCellProps = {
  x: number;
  y: number;
  rem?: number;
  isActive: boolean;
  isVisited?: boolean;
  theme: TCellTheme;
};

const Cell: FC<TCellProps> = ({
  x,
  y,
  rem = 20,
  isActive,
  isVisited,
  theme,
}) => (
  <rect
    height={rem}
    width={rem}
    x={x * rem}
    y={y * rem}
    data-theme={theme}
    data-active={isActive}
    data-visited={isVisited}
    className={css.node}
  />
);

export default Cell;
