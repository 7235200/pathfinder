import Grid, { TSource } from './Grid';

const source: TSource = [
  [0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0]
];

const grid = new Grid(source);
grid.print();
