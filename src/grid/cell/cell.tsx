import css from './cell.mod.css';
import { h, FunctionComponent as FC } from 'preact';

export type TCellTheme = 'manual' | 'dfs' | 'io' | 'grid';
export enum TVision {
  'clear' = 0,
  'shadow' = 1,
  'blind' = 2,
}

type TCellProps = {
  x: number;
  y: number;
  rem?: number;
  vision?: TVision;
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
  vision,
}) => (
  <rect
    height={rem}
    width={rem}
    x={x * rem}
    y={y * rem}
    data-theme={theme}
    data-depth={vision}
    data-active={isActive}
    data-visited={isVisited}
    className={css.node}
  />
);

export default Cell;
