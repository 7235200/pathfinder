type TValue = 0 | 1;
export type TSource = TValue[][];

export default class Graph {
  graph: Map<string, Set<string>>;
  start: string;
  target: string;
  isDone: boolean = false;

  constructor(source: TSource) {
    this.graph = new Map();
    this.createFrom(source);

    // take the top left item as a default input
    this.start = '0,0';

    // take the bottom center item as a default output
    this.target = [
      Math.floor(source[0].length / 2),
      source.length - 1
    ].toString();
  }

  addNode(node: string) {
    this.graph.set(node, new Set());
  }

  addEdge(from: string, to: string) {
    const node = this.graph.get(from);
    if (node) node.add(to);
  }

  addSibling(currentNode: string, sibling: [number, number]) {
    const node = String(sibling);
    if (!this.graph.has(node)) this.addNode(node);
    this.addEdge(currentNode, node);
  }

  createFrom(matrix: TSource) {
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

  dfs(
    start: string = this.start,
    target: string = this.target,
    visited: Set<string> = new Set()
  ): string[] | undefined {
    if (visited.size === 0) this.isDone = false;
    if (this.isDone) return;

    visited.add(start);

    const steps = this.graph.get(start);
    if (!steps) return;

    for (const step of steps) {
      if (step === target) {
        visited.add(step);
        this.isDone = true;
        return;
      }

      if (!visited.has(step)) this.dfs(step, target, visited);
    }

    return Array.from(visited);
  }

  print() {
    for (const node of this.graph.keys()) {
      const siblings = Array.from(this.graph.get(node)!).reduce(
        (str: string, value: string) => `${str}[${value}]`,
        ''
      );

      console.log(`[${node}] -> ${siblings}`);
    }
  }
}
