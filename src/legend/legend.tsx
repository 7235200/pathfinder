import css from './styles.mod.css';
import { h, FunctionComponent } from 'preact';

type TProps = {
  activeCellId: string;
  currentStep: number;
  success: boolean;
};

const Legend: FunctionComponent<TProps> = ({
  activeCellId,
  currentStep,
  success
}) => (
  <legend className={css.container}>
    <dl className={css.dl}>
      <dt children="active cell" />
      <dd children={activeCellId} />
    </dl>
    <dl className={css.dl}>
      <dt children="total steps" />
      <dd children={currentStep} />
    </dl>
    <dl className={css.dl}>
      <dt children="success" />
      <dd children={String(success)} />
    </dl>
  </legend>
);

export default Legend;
