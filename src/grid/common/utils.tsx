export const chordsToCellId = (x: number, y: number) => `${x},${y}`;
export const cellIdToChords = (cellId: string) => cellId.split(',').map(Number);

const isChoordUnderWarFog = (
  gridChoord: number,
  activeChoord: number,
  threshold: number
) => Math.abs(gridChoord - activeChoord) > threshold;

export const isCellUnderWarFog = (
  cellX: number,
  cellY: number,
  activeX: number,
  activeY: number,
  threshold: number
) =>
  isChoordUnderWarFog(cellX, activeX, threshold) ||
  isChoordUnderWarFog(cellY, activeY, threshold);
