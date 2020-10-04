import { TGraphInstance } from '~/utils/graph';
import { chordsToCellId } from '~/grid';

const getNumberInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

type TPath = 'enemy' | 'friend';

export type IPathConstructor = (type: TPath) => IPath;

export interface IPath {
  readonly type: TPath;
  inputCellId: string | null;
  outputCellId: string | null;
  path: Set<string>;
  success: boolean;
  solve(graph: TGraphInstance, size: number): void;
}

export default class Path implements IPath {
  readonly type: TPath;
  inputCellId: string | null;
  outputCellId: string | null;
  path: Set<string>;
  success: boolean;

  constructor(type: TPath) {
    this.type = type;
    this.path = new Set();
    this.success = false;
    this.inputCellId = null;
    this.outputCellId = null;
  }

  #genIO = (size: number) => {
    let inputIdx = 0;
    let outputIdx = 0;

    // make it harder to find the way out
    while (Math.abs(inputIdx - outputIdx) < size * 0.5) {
      inputIdx = getNumberInRange(0, size);
      outputIdx = getNumberInRange(0, size);
    }

    this.inputCellId = chordsToCellId(inputIdx, inputIdx);
    this.outputCellId = chordsToCellId(outputIdx, outputIdx);
  };

  solve(graph: TGraphInstance, size: number) {
    let attemptsLeft = 4e3;
    this.success = false;

    while (!this.success && attemptsLeft) {
      attemptsLeft--;
      this.#genIO(size);
      this.#search(graph);
    }
  }

  #search = (
    graph: TGraphInstance,
    input: string | null = this.inputCellId,
    visited = new Set<string>()
  ): string | null => {
    if (!input) return null;
    visited.add(input);

    if (input === this.outputCellId) {
      this.path = visited;
      this.success = true;
      return input;
    }

    const children = graph.get(input);
    if (!children) return null;

    for (const child of children) {
      if (!visited.has(child)) {
        const result = this.#search(graph, child, visited);
        // do not continue if we've found the target
        if (result) return result;
      }
    }

    this.path = visited;
    this.success = false;
    return null;
  };
}
