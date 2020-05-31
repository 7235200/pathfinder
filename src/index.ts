import './main.css';
import Grid, { TSource } from './Grid';

const source: TSource = [
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
];

const grid = new Grid(source);
const path = Array.from(grid.dfs() as Set<string>);

// @ts-ignore
const root = document.getElementById('root');

const createNode = ([vX, vY, vZ]: number[]) => {
  // @ts-ignore
  const node = document.createElement('div');

  node.className = 'node';
  node.dataset.blocked = Boolean(vZ);
  node.id = `${vX},${vY}`;

  node.setAttribute('style', `top: ${vY}rem; left: ${vX}rem`);

  root.appendChild(node);
};

let x: number = 0;

while (x < source[0].length) {
  let y: number = 0;

  while (y < source.length) {
    createNode([x, y, source[y][x]]);
    y++;
  }

  x++;
}

const delay = 100;

path.forEach((id, idx) => {
  setTimeout(() => {
    // @ts-ignore
    const current = document.getElementById(id);
    // @ts-ignore
    const prev = document.getElementById(path[idx - 1]);

    if (prev) prev.dataset.active = false;
    current.dataset.active = true;

  }, delay * idx);
});
