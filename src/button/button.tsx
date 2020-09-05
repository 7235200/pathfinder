import css from './button.mod.css';
import { h, FunctionComponent as FC } from 'preact';

type TProps = { onClick(): void };

const Button: FC<TProps> = ({ onClick, children }) => (
  <button className={css.button} {...{ onClick, children }} />
);

export default Button;
