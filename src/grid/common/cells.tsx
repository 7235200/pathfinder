import { h, Fragment } from 'preact';

import Cell from '../cell';
import { TGridInstance } from '~/utils/grid';
import { getWarFogVision, chordsToCellId, cellIdToChords } from './utils';

const warForThreshold = 3;

type TProps = {
  source: TGridInstance;
  activeIdx: string;
  outputCellId: string;
};
const GridCells = ({ source, activeIdx, outputCellId }: TProps) => {
  const [activeX, activeY] = cellIdToChords(activeIdx);
  const isComplete = activeIdx === outputCellId;

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
                warForThreshold,
                isComplete
              )}
            />
        )))
      }
    </Fragment>
  );
};

export default GridCells;
