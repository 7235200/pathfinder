import { TGridInstance } from './grid';
export type TGraphInstance = Map<string, Set<string>>;

export default class Graph {
  source: TGridInstance;
  instance: TGraphInstance = new Map();

  constructor(source: TGridInstance) {
    this.source = source;
    this.createFrom(source);
  }

  addNode(node: string) {
    this.instance.set(node, new Set());
  }

  addEdge(from: string, to: string) {
    const node = this.instance.get(from);
    if (node) node.add(to);
  }

  addSibling(currentNode: string, sibling: [number, number]) {
    const node = String(sibling);
    if (!this.instance.has(node)) this.addNode(node);
    this.addEdge(currentNode, node);
  }

  createFrom(matrix: TGridInstance) {
    this.instance = new Map();
    let x = 0;

    while (x < matrix[0].length) {
      let y = 0;

      while (y < matrix.length) {
        const item = matrix[y][x];

        if (item === 0) {
          const currentNode = [x, y].toString();
          this.addNode(currentNode);

          // right
          if (matrix[y][x + 1] === 0) {
            this.addSibling(currentNode, [x + 1, y]);
          }

          // down
          if (matrix[y + 1] && matrix[y + 1][x] === 0) {
            this.addSibling(currentNode, [x, y + 1]);
          }

          // left
          if (matrix[y][x - 1] === 0) {
            this.addSibling(currentNode, [x - 1, y]);
          }

          // up
          if (matrix[y - 1] && matrix[y - 1][x] === 0) {
            this.addSibling(currentNode, [x, y - 1]);
          }
        }

        y++;
      }

      x++;
    }
  }
}
