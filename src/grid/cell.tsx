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
};

const Cell: FC<TCellProps> = ({
  x,
  y,
  rem,
  isBlocked,
  isActive,
  isInput,
  isOutput
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
    className={css.node}
  />
);

export default Cell;
