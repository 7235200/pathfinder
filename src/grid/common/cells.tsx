import { h, Fragment } from 'preact';

import Cell from '../cell';
import { TGridInstance } from '~/utils/grid';
import { getWarFogVision, chordsToCellId, cellIdToChords } from './utils';

const warFogThreshold = 3;

type TProps = {
  source: TGridInstance;
  activeCellId: string;
  outputCellId: string;
};

const GridCells = ({ source, activeCellId, outputCellId }: TProps) => {
  const [activeX, activeY] = cellIdToChords(activeCellId);
  const isComplete = activeCellId === outputCellId;

  return (
    <Fragment>
      {
        /* prettier-ignore */
        source.map((height, y) => height.map((value, x) => (
            <Cell
              theme="grid"
              key={chordsToCellId(x, y)}
              {...{ x, y }}
              isActive={Boolean(value)}
              vision={getWarFogVision(
                x,
                y,
                activeX,
                activeY,
                warFogThreshold,
                isComplete
              )}
            />
        )))
      }
    </Fragment>
  );
};

export default GridCells;
