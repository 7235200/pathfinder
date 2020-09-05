import { useRef, useEffect, useState, useCallback } from 'preact/hooks';
import { TGraphInstance } from '~/utils/graph';

export type TPath = Set<string>;

const keys = { left: 37, up: 38, right: 39, down: 40 };

export default function useManualPath(
  graph: TGraphInstance,
  inputIdx: string,
  outputIdx: string
) {
  const [activeIdx, setActiveIdx] = useState<string>(inputIdx);
  const path = useRef<TPath>(new Set());
  const [currentStep, setStep] = useState<number>(0);

  // listener callback
  const handler = useCallback(
    (evt: KeyboardEvent) => {
      const activeCell = activeIdx.split(',').map(Number);
      const activeGraphNode = graph.get(activeIdx);

      // right
      if (evt.keyCode === keys.right) {
        const nextCell = toRight(activeCell);
        if (activeGraphNode?.has(nextCell)) setActiveIdx(nextCell);
      }

      // down
      if (evt.keyCode === keys.down) {
        const nextCell = toDown(activeCell);
        if (activeGraphNode?.has(nextCell)) setActiveIdx(nextCell);
      }

      // left
      if (evt.keyCode === keys.left) {
        const nextCell = toLeft(activeCell);
        if (activeGraphNode?.has(nextCell)) setActiveIdx(nextCell);
      }

      // left
      if (evt.keyCode === keys.up) {
        const nextCell = toUp(activeCell);
        if (activeGraphNode?.has(nextCell)) setActiveIdx(nextCell);
      }
    },
    [activeIdx]
  );

  useEffect(() => {
    // reattach listener
    document.addEventListener('keydown', handler);

    // go to the next cell
    path.current.add(activeIdx);
    setStep((i) => ++i);

    // reaches the traget
    if (activeIdx === outputIdx) {
      document.removeEventListener('keydown', handler);
    }

    // cleanup
    return () => document.removeEventListener('keydown', handler);
  }, [handler]);

  // reset state for the new graph
  useEffect(() => {
    setStep(0);
    path.current.clear();
    setActiveIdx(inputIdx);
  }, [graph]);

  return { activeIdx, path: path.current, currentStep };
}

type TNodeId = number[];
const toRight = ([x, y]: TNodeId) => [x + 1, y].toString();
const toDown = ([x, y]: TNodeId) => [x, y + 1].toString();
const toLeft = ([x, y]: TNodeId) => [x - 1, y].toString();
const toUp = ([x, y]: TNodeId) => [x, y - 1].toString();
