import css from './styles.mod.css';
import { h, FunctionComponent as FC } from 'preact';
import { memo } from 'preact/compat';

type TProps = {
  activeCellId: string;
  currentStep: number;
  success: boolean;
};

const Legend: FC<TProps> = ({ activeCellId, currentStep, success }) => (
  <legend className={css.container}>
    {!success && <div className={css.error}>no way out</div>}
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
