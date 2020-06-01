import './main.css';
import Grid, { TSource } from './Grid';

const genRow = (size: number) => {
  return new Array(size).fill(1).map(getRandom);
};

const generateSource = (sWidth: number, sheight: number) => {
  const width = sWidth;
  let height = sheight;

  const src: number[][] = [];

  while (height >= 0) {
    src.push(genRow(width));
    height--;
  }

  src[0][0] = 0;
  src[sheight - 1][sWidth - 1] = 0;

  return src;
};

function getRandom() {
  const num = Math.random();
  if (num < 0.3) return 1;
  else return 0
}

// @ts-ignore
const root = document.getElementById('grid');

const createNode = ([vX, vY, vZ]: number[]) => {
  // @ts-ignore
  const node = document.createElement('div');

  node.className = 'node';
  node.dataset.blocked = Boolean(vZ);
  node.id = `${vX},${vY}`;

  node.setAttribute('style', `top: ${vY}rem; left: ${vX}rem`);

  root.appendChild(node);
};

let source: TSource;
let path: string[];

const draw = () => {
  root.textContent = '';

  source = generateSource(30, 30) as TSource;
  const grid = new Grid(source);
  path = Array.from(grid.dfs() as Set<string>);
  let x: number = 0;

  while (x < source[0].length) {
    let y: number = 0;

    while (y < source.length) {
      createNode([x, y, source[y][x]]);
      y++;
    }

    x++;
  }
};

const delay = 85;

const run = () => {
  path.forEach((id, idx) => {
    setTimeout(() => {
      // @ts-ignore
      const current = document.getElementById(id);
      // @ts-ignore
      const prev = document.getElementById(path[idx - 1]);

      if (prev) prev.dataset.active = false;
      current.dataset.active = true;

      if (idx === path.length - 1) {
        setTimeout(() => {
          current.dataset.active = false;
        }, 1000);
      }
    }, delay * idx);
  });
};

// @ts-ignore
const runButton = document.getElementById('run');
// @ts-ignore
const generateButton = document.getElementById('generate');

runButton.onclick = run;
generateButton.onclick = () => {
  draw();
};
