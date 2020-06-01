type TValue = 0 | 1;

export default class Grid {
  width: number;
  height: number;
  proximity: number;
  instance: TValue[][];

  constructor(width: number, height: number, proximity: number) {
    this.width = width;
    this.height = height;
    this.proximity = proximity;
    this.instance = this.createGrid();
  }

  createCellValue = (): TValue => {
    return Math.random() < this.proximity ? 1 : 0;
  };

  createRow = (size: number = this.width): TValue[] => {
    return new Array(size).fill(1).map(this.createCellValue);
  };

  createGrid = (
    width: number = this.width,
    sourceHeight: number = this.height
  ) => {
    const grid: TValue[][] = [];
    let height = sourceHeight;

    while (height >= 0) {
      grid.push(this.createRow(width));
      height--;
    }

    return grid;
  };
}
