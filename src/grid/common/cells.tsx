import { h, Fragment } from 'preact';

import Cell from '../cell';
import { TGridInstance } from '~/utils/grid';
import { chordsToCellId } from './utils';

const GridCells = ({ source }: { source: TGridInstance }) => (
  <Fragment>
    {
      /* prettier-ignore */
      source.map((height, y) => height.map((value, x) => (
        <Cell
          theme="grid"
          key={chordsToCellId(x, y)}
          isActive={Boolean(value)}
          {...{ x, y }}
        />
      )))
    }
  </Fragment>
);

export default GridCells;
