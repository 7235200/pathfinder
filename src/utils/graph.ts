import { TGridInstance } from './grid';
import GridSource, { IGrid } from '~/utils/grid';

export type TGraphInstance = Map<string, Set<string>>;

interface IGraph {
  graph: TGraphInstance;
}

export default class Graph extends GridSource implements IGraph {
  graph: TGraphInstance = new Map();

  constructor(size: number, proximity: number) {
    super(size, proximity);
    this.setGraph();
  }

  setGraph() {
    this.graph = new Map();
    let x = 0;

    while (x < this.grid[0].length) {
      let y = 0;

      while (y < this.grid.length) {
        const item = this.grid[y][x];

        if (item === 0) {
          const currentNode = [x, y].toString();
          this.addNode(currentNode);

          // right
          if (this.grid[y][x + 1] === 0) {
            this.addSibling(currentNode, [x + 1, y]);
          }

          // down
          if (this.grid[y + 1] && this.grid[y + 1][x] === 0) {
            this.addSibling(currentNode, [x, y + 1]);
          }

          // left
          if (this.grid[y][x - 1] === 0) {
            this.addSibling(currentNode, [x - 1, y]);
          }

          // up
          if (this.grid[y - 1] && this.grid[y - 1][x] === 0) {
            this.addSibling(currentNode, [x, y - 1]);
          }
        }

        y++;
      }

      x++;
    }
  }

  private addNode = (node: string) => {
    this.graph.set(node, new Set());
  };

  private addEdge = (from: string, to: string) => {
    const node = this.graph.get(from);
    if (node) node.add(to);
  };

  private addSibling = (currentNode: string, sibling: [number, number]) => {
    const node = String(sibling);
    if (!this.graph.has(node)) this.addNode(node);
    this.addEdge(currentNode, node);
  };
}
