import css from './styles.mod.css';
import { h, Fragment, FunctionComponent as FC } from 'preact';

type TProps = { onCreate(): void; onRun(): void };

const Actions: FC<TProps> = ({ onCreate, onRun }) => (
  <Fragment>
    <button className={css.action} onClick={onCreate} children="generate" />
    <button className={css.action} onClick={onRun} children="run" />
  </Fragment>
);

export default Actions;
