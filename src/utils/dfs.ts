import Graph from './graph';

interface IDfs {
  path: Set<string>;
  generate: () => void;
}

export default class Dfs extends Graph implements IDfs {
  success: boolean;
  path: Set<string>;

  constructor(size: number, proximity: number) {
    super(size, proximity);

    this.success = false;
    this.path = new Set();
    this.generate();
  }

  search = (
    input: string = this.inputCellId,
    visited = new Set<string>()
  ): string | null => {
    visited.add(input);

    if (input === this.outputCellId) {
      this.path = visited;
      this.success = true;
      return input;
    }

    const children = this.graph.get(input);
    if (!children) return null;

    for (const child of children) {
      if (!visited.has(child)) {
        const result = this.search(child, visited);
        // do not continue if we've found the target
        if (result) return result;
      }
    }

    this.path = visited;
    this.success = false;
    return null;
  };

  generate() {
    this.success = false;

    return new Promise((resolve) => {
      while (!this.success) {
        this.setIO();
        this.setGrid();
        this.setGraph();
        this.search();
      }

      resolve();
    });
  }
}
