import { h, Fragment } from 'preact';

import Cell from '../cell';
import { TGridInstance } from '~/utils/grid';
import { isCellUnderWarFog, chordsToCellId, cellIdToChords } from './utils';

const threshold = 5;

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
              isActive={
                // real wall value
                Boolean(value) ||
                (
                  // clear war fog after the path is complete
                  !isComplete &&
                  // war fog choords treshold
                  isCellUnderWarFog(x, y, activeX, activeY, threshold)
                )
              }
            />
        )))
      }
    </Fragment>
  );
};

export default GridCells;
