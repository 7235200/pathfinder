import { chordsToCellId } from '~/grid';

enum TValue {
  open = 0,
  close = 1,
}
export type TGridInstance = TValue[][];

const getNumberInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export interface IGrid {
  inputCellId: string;
  outputCellId: string;
  grid: TGridInstance;
  setIO: (inputIdx: number, outputIdx: number) => void;
}

export default class Grid implements IGrid {
  grid: TGridInstance = [];
  private readonly size: number;
  private readonly proximity: number;
  private io: [number, number];

  constructor(size: number, proximity: number) {
    this.size = size;
    this.proximity = proximity;
    this.io = this.setIO();
    this.setGrid();
  }

  get inputCellId() {
    return chordsToCellId(this.io[0], this.io[0]);
  }

  get outputCellId() {
    return chordsToCellId(this.io[1], this.io[1]);
  }

  setIO = (): [number, number] => {
    const inputIdx = getNumberInRange(0, this.size);
    const outputIdx = getNumberInRange(0, this.size);

    // make it harder to find the way out
    if (Math.abs(inputIdx - outputIdx) < this.size * 0.5) {
      return this.setIO();
    }

    this.io = [inputIdx, outputIdx];
    return this.io;
  };

  setGrid() {
    this.grid = [];
    let size = this.size;

    while (size >= 0) {
      this.grid.push(this.createRow());
      size--;
    }

    // make sure input cells are opened
    this.grid[this.io[0]][this.io[0]] = TValue.open;

    // make sure output cells are opened
    this.grid[this.io[1]][this.io[1]] = TValue.open;
  }

  private createCellValue = (): TValue => {
    return Math.random() < this.proximity ? TValue.close : TValue.open;
  };

  private createRow(): TValue[] {
    return new Array(this.size + 1).fill(1).map(this.createCellValue);
  }
}
