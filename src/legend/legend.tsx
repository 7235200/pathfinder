import css from './styles.mod.css';
import { h, FunctionComponent as FC } from 'preact';
import { memo } from 'preact/compat';

type TProps = {
  title: string;
  activeCellId: string;
  currentStep: number;
};

const Legend: FC<TProps> = ({ title, activeCellId, currentStep }) => (
  <legend className={css.container}>
    <h3 children={title} />
    <Node dt="active cell" dd={activeCellId} />
    <Node dt="total steps" dd={currentStep} />
  </legend>
);

export default memo(Legend);

const Node: FC<{ dt: string; dd: string | number }> = ({ dt, dd }) => (
  <dl className={css.dl}>
    <dt children={dt} />
    <dd children={dd} />
  </dl>
);
