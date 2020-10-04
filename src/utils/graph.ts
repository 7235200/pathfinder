import GridSource from '~/utils/grid';
import Path, { IPathConstructor } from '~/utils/path';

export type TGraphInstance = Map<string, Set<string>>;

interface IGraph {
  graph: TGraphInstance;
  paths: Path[];
  friend: Path | null;
  enemies: Path[];
  addPath(...args: Parameters<IPathConstructor>): void;
}

export default class Graph extends GridSource implements IGraph {
  graph: TGraphInstance = new Map();
  paths: Path[];

  constructor(size: number, proximity: number) {
    super(size, proximity);

    this.paths = [];
    this.setGraph();
  }

  get friend() {
    return this.paths.find((p) => p.type === 'friend') || null;
  }

  get enemies() {
    return this.paths.filter((p) => p.type === 'enemy');
  }

  setGraph() {
    this.paths = [];
    this.graph = new Map();

    let x = 0;

    while (x < this.grid[0].length) {
      let y = 0;

      while (y < this.grid.length) {
        const item = this.grid[y][x];

        if (item === 0) {
          const currentNode = [x, y].toString();
          this.#addNode(currentNode);

          // right
          if (this.grid[y][x + 1] === 0) {
            this.#addSibling(currentNode, [x + 1, y]);
          }

          // down
          if (this.grid[y + 1] && this.grid[y + 1][x] === 0) {
            this.#addSibling(currentNode, [x, y + 1]);
          }

          // left
          if (this.grid[y][x - 1] === 0) {
            this.#addSibling(currentNode, [x - 1, y]);
          }

          // up
          if (this.grid[y - 1] && this.grid[y - 1][x] === 0) {
            this.#addSibling(currentNode, [x, y - 1]);
          }
        }

        y++;
      }

      x++;
    }
  }

  addPath = (...args: Parameters<IPathConstructor>) => {
    const path = new Path(...args);
    // find the path
    path.solve(this.graph, this.size);

    // make sure io cells are opened
    this.openCell(path.inputCellId!);
    this.openCell(path.outputCellId!);

    // add to the store
    this.paths.push(path);
  };

  #addNode = (node: string) => {
    this.graph.set(node, new Set());
  };

  #addEdge = (from: string, to: string) => {
    const node = this.graph.get(from);
    if (node) node.add(to);
  };

  #addSibling = (currentNode: string, sibling: [number, number]) => {
    const node = String(sibling);
    if (!this.graph.has(node)) this.#addNode(node);
    this.#addEdge(currentNode, node);
  };
}
