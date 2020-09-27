import { h, Fragment } from 'preact';

import Cell from '~/grid/cell';

import { cellIdToChords } from '~/grid/common';

type TProps = {
  path: Set<string>;
  activeCellId: string;
};

const EnemyPath = ({ path, activeCellId }: TProps) => (
  <Fragment>
    {[...path].map((cellId) => {
      const [x, y] = cellIdToChords(cellId);

      return (
        <Cell
          theme="dfs"
          key={cellId}
          {...{ x, y }}
          isActive={cellId === activeCellId}
        />
      );
    })}
  </Fragment>
);

export default EnemyPath;
