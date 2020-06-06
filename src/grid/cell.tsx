import css from './styles/cell.mod.css';
import { h, FunctionComponent } from 'preact';
import { getPosition } from './common';

type TCellProps = {
  id: string;
  x: number;
  y: number;
  isInput: boolean;
  isOutput: boolean;
  isBlocked: boolean;
  isActive: boolean;
};

const Cell: FunctionComponent<TCellProps> = ({
  id,
  x,
  y,
  isBlocked,
  isActive,
  isInput,
  isOutput
}) => (
  <div
    key={id}
    {...{ id }}
    style={getPosition(x, y)}
    data-blocked={isBlocked}
    data-active={isActive}
    data-input={isInput}
    data-output={isOutput}
    className={css.node}
  />
);

export default Cell;
