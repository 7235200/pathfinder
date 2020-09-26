import Graph, { TGraphInstance } from './graph';

interface IDfs {
  path: Set<string>;
  generate: () => void;
}

export default class Dfs extends Graph implements IDfs {
  private readonly canFail: boolean;
  success: boolean;
  path: Set<string>;

  constructor(size: number, proximity: number, canFail: boolean = true) {
    super(size, proximity);

    this.success = false;
    this.path = new Set();
    this.canFail = canFail;
    this.search();
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

    if (!this.canFail) {
      this.setIO();
      this.setGraph();
      // TODO: MX CALL STACK
      return this.search();
    }

    this.path = visited;
    this.success = false;
    return null;
  };

  generate() {
    this.setIO();
    this.setGraph();
    this.search();
  }
}
