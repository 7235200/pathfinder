type TValue = 0 | 1;
export type TGridInstance = TValue[][];

export default class Grid {
  width: number;
  height: number;
  proximity: number;
  instance: TGridInstance;
  inputIndex: number;
  outputIndex: number;

  constructor(
    width: number,
    height: number,
    proximity: number,
    inputIndex: number,
    outputIndex: number
  ) {
    this.width = width;
    this.height = height;
    this.proximity = proximity;
    this.inputIndex = inputIndex;
    this.outputIndex = outputIndex;
    this.instance = this.createGrid();
  }

  createCellValue = (proximity: number = this.proximity): TValue => {
    return Math.random() < proximity ? 1 : 0;
  };

  createRow = (
    size: number = this.width,
    proximity: number = this.proximity
  ): TValue[] =>
    new Array(size).fill(1).map(() => this.createCellValue(proximity));

  createGrid = (
    width: number = this.width,
    sourceHeight: number = this.height,
    proximity: number = this.proximity,
    inputIndex: number = this.inputIndex,
    outputIndex: number = this.outputIndex
  ) => {
    const grid: TGridInstance = [];
    let height = sourceHeight;

    while (height >= 0) {
      grid.push(this.createRow(width, proximity));
      height--;
    }

    // make sure input cells are opened
    grid[0][inputIndex] = 0;

    // make sure output cells are opened
    grid[sourceHeight][outputIndex - 1] = 0;

    this.instance = grid;
    return grid;
  };
}
