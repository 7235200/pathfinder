import { TVision } from '../cell';

export const chordsToCellId = (x: number, y: number) => `${x},${y}`;
export const cellIdToChords = (cellId: string) => cellId.split(',').map(Number);

const isChoordUnderWarFog = (
  gridChoord: number,
  activeChoord: number,
  threshold: number
) => Math.abs(gridChoord - activeChoord) > threshold;

const isCellUnderWarFog = (
  cellX: number,
  cellY: number,
  activeX: number,
  activeY: number,
  threshold: number
) =>
  isChoordUnderWarFog(cellX, activeX, threshold) ||
  isChoordUnderWarFog(cellY, activeY, threshold);

export const getWarFogVision = (
  cellX: number,
  cellY: number,
  activeX: number,
  activeY: number,
  threshold: number,
  isComplete: boolean
): TVision => {
  // path is done, clear the fog
  if (isComplete) return TVision.clear;

  // complete dark
  if (isCellUnderWarFog(cellX, cellY, activeX, activeY, threshold)) {
    return TVision.blind;
  }

  // attempt to make a shadow-like path
  if (isCellUnderWarFog(cellX, cellY, activeX, activeY, threshold / 2)) {
    return TVision.shadow;
  }

  // clear vision
  return TVision.clear;
};
