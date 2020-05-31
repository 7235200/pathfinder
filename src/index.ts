import Grid, { TSource } from './Grid';

const source: TSource = [
  [0, 0, 0, 0, 1, 1],
  [0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0],
  [1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 1, 1, 1, 0, 1],
];

const grid = new Grid(source);
const path = grid.dfs();
console.log(path);
