type TValue = 0 | 1;
export type TSource = TValue[][];

export default class Grid {
  graph: Map<string, Set<string>>;

  constructor(source: TSource) {
    this.graph = new Map();
    this.fill(source);
  }

  addNode(node: string) {
    this.graph.set(node, new Set());
  }

  addEdge(from: string, to: string) {
    const fromNode = this.graph.get(from);
    if (fromNode) fromNode.add(to);
  }

  addSibling(currentNode: string, sibling: [number, number]) {
    const siblingNode = String(sibling);
    if (!this.graph.has(siblingNode)) this.addNode(siblingNode);
    this.addEdge(currentNode, siblingNode);
  }

  fill(matrix: TSource) {
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

  print() {
    const nodes = Array.from(this.graph.keys());

    for (const node of nodes) {
      const siblings = Array.from(this.graph.get(node)!).reduce(
        (str: string, value: string) => `${str} [${value}]`,
        ''
      );

      console.log(`[${node}] -> ${siblings}`);
    }
  }
}
