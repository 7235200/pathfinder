import css from './styles.mod.css';
import { h } from 'preact';

import { TGameStatus } from './useGameStatus';

const Header = ({ status }: { status: TGameStatus }) => (
  <div className={css.header}>
    <h3 className={css.title}>
      find your friend in a darkness before they know you're here
    </h3>
    <div>status: {status}</div>
    <div>space to restart</div>
  </div>
);

export default Header;
