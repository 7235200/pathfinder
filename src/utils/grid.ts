import { cellIdToChords } from '~/grid/common';

enum TValue {
  open = 0,
  close = 1,
}

export type TGridInstance = TValue[][];

export interface IGrid {
  grid: TGridInstance;
}

export default abstract class Grid implements IGrid {
  grid: TGridInstance = [];
  readonly size: number;
  readonly proximity: number;

  constructor(size: number, proximity: number) {
    this.size = size;
    this.proximity = proximity;
    this.setGrid();
  }

  setGrid() {
    this.grid = [];
    let size = this.size;

    while (size >= 0) {
      this.grid.push(this.#createRow());
      size--;
    }
  }

  openCell = (cellId: string) => {
    const [x, y] = cellIdToChords(cellId);
    this.grid[x][y] = TValue.open;
  };

  #createCellValue = (): TValue => {
    return Math.random() < this.proximity ? TValue.close : TValue.open;
  };

  #createRow = (): TValue[] => {
    return new Array(this.size + 1).fill(1).map(this.#createCellValue);
  };
}
