import { TGraphInstance } from './graph';

export default class Dfs {
  graph: TGraphInstance;
  input: string;
  output: string;
  success: boolean;
  instance: Set<string>;

  constructor(graph: TGraphInstance, input: string, output: string) {
    this.graph = graph;
    this.input = input;
    this.output = output;
    this.success = false;
    this.instance = new Set();
    this.search();
  }

  search(
    graph: TGraphInstance = this.graph,
    input: string = this.input,
    output: string = this.output,
    visited = new Set<string>()
  ): string | null {
    visited.add(input);

    if (input === output) {
      this.instance = visited;
      this.success = true;
      return input;
    }

    const children = graph.get(input);
    if (!children) return null;

    for (const child of children) {
      if (!visited.has(child)) {
        const result = this.search(graph, child, output, visited);
        // do not continue if we've found the target
        if (result) return result;
      }
    }

    this.instance = visited;
    this.success = false;
    return null;
  }
}
