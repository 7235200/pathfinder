export const chordsToCellId = (x: number, y: number) => `${x},${y}`;
export const cellIdToChords = (cellId: string) => cellId.split(',').map(Number);
