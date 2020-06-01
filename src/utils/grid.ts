type TValue = 0 | 1;
export type TGridInstance = TValue[][];

export default class Grid {
  width: number;
  height: number;
  proximity: number;
  instance: TGridInstance;
  input: number[];
  output: number[];

  constructor(
    width: number,
    height: number,
    proximity: number,
    input: number[],
    output?: number[]
  ) {
    this.width = width;
    this.height = height;
    this.proximity = proximity;
    this.input = input;
    this.output = output || input; // symmetric to input indexes by default
    this.instance = this.createGrid();
  }

  createCellValue = (proximity: number = this.proximity): TValue => {
    return Math.random() < proximity ? 1 : 0;
  };

  createRow = (
    size: number = this.width,
    proximity: number = this.proximity
  ): TValue[] => {
    return new Array(size).fill(1).map(() => this.createCellValue(proximity));
  };

  createGrid = (
    width: number = this.width,
    sourceHeight: number = this.height,
    proximity: number = this.proximity,
    input: number[] = this.input,
    output: number[] = this.output
  ) => {
    const grid: TGridInstance = [];
    let height = sourceHeight;

    while (height >= 0) {
      grid.push(this.createRow(width, proximity));
      height--;
    }

    // make sure input cells are opened
    input.forEach(inputIndex => {
      grid[0][inputIndex] = 0;
    });

    // make sure output cells are opened
    output.forEach(outputIndex => {
      grid[sourceHeight - 1][outputIndex] = 0;
    });

    this.instance = grid;
    return grid;
  };
}
