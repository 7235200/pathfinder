import { h, Fragment } from 'preact';

import Cell from '~/grid/cell';

import { cellIdToChords, getWarFogVision } from '~/grid/common';

type TProps = {
  path: Set<string>;
  activeCellId: string;
  outputCellId: string;
};

const warFogLevel = 3;

const ManualPath = ({ path, activeCellId, outputCellId }: TProps) => {
  const [activeX, activeY] = cellIdToChords(activeCellId);
  const isComplete = activeCellId === outputCellId;

  return (
    <Fragment>
      {[...path].map((cellId) => {
        const [x, y] = cellIdToChords(cellId);

        return (
          <Cell
            key={cellId}
            {...{ x, y }}
            theme="manual"
            isActive={cellId === activeCellId || cellId === outputCellId}
            vision={getWarFogVision(
              x,
              y,
              activeX,
              activeY,
              warFogLevel,
              isComplete
            )}
          />
        );
      })}
    </Fragment>
  );
};

export default ManualPath;
