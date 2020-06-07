import css from './styles/cell.mod.css';
import { h, FunctionComponent as FC } from 'preact';

type TCellProps = {
  x: number;
  y: number;
  rem: number;
  isInput: boolean;
  isOutput: boolean;
  isBlocked: boolean;
  isActive: boolean;
  isVisited: boolean;
  isManualActive: boolean;
  isManualVisited: boolean;
};

const Cell: FC<TCellProps> = ({
  x,
  y,
  rem,
  isBlocked,
  isActive,
  isInput,
  isOutput,
  isVisited,
  isManualActive,
  isManualVisited
}) => (
  <rect
    height={rem}
    width={rem}
    x={x * rem}
    y={y * rem}
    data-blocked={isBlocked}
    data-active={isActive}
    data-input={isInput}
    data-output={isOutput}
    data-visited={isVisited}
    data-manual-active={isManualActive}
    data-manual-visited={isManualVisited}
    className={css.node}
  />
);

export default Cell;
