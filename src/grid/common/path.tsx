import { h, Fragment } from 'preact';

import Cell, { TCellTheme } from '../cell';
import { cellIdToChords } from './utils';

type TProps = {
  path: Set<string>;
  activeIdx: string;
  outputIdx: string;
  theme: TCellTheme;
};

const Path = ({ path, activeIdx, outputIdx, theme }: TProps) => (
  <Fragment>
    {[...path].map((cellId) => {
      const [x, y] = cellIdToChords(cellId);

      return (
        <Cell
          key={cellId}
          {...{ x, y, theme }}
          data-theme={theme}
          isActive={cellId === activeIdx}
          isVisited={activeIdx === outputIdx}
        />
      );
    })}
  </Fragment>
);

export default Path;
