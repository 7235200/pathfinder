import GridSource from '~/utils/grid';
import Graph from '~/utils/graph';
import Dfs from '~/utils/dfs';

import { useState, useCallback, useRef } from 'preact/hooks';
import { chordsToCellId } from '~/grid';

const getNumberInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export default function useGrid(size: number, proximity: number = 0.3) {
  const { current: grid } = useRef(new GridSource({ size, proximity }));

  return {
    grid,
  };
}
