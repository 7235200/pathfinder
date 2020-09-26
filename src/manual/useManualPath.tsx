import { useRef, useEffect, useState, useCallback } from 'preact/hooks';
import { TGraphInstance } from '~/utils/graph';

export type TPath = Set<string>;

enum TKeyboard {
  left = 37,
  up = 38,
  right = 39,
  down = 40,
}

export default function useManualPath(
  graph: TGraphInstance,
  inputCellId: string,
  outputCellId: string
) {
  const [activeCellId, setActiveCellId] = useState<string>(inputCellId);
  const path = useRef<TPath>(new Set());
  const [currentStep, setStep] = useState<number>(0);

  // listener callback
  const handler = useCallback(
    (evt: KeyboardEvent) => {
      const activeCell = activeCellId.split(',').map(Number);
      const activeGraphNode = graph.get(activeCellId);
      // right
      if (evt.keyCode === TKeyboard.right) {
        const nextCell = toRight(activeCell);
        if (activeGraphNode?.has(nextCell)) setActiveCellId(nextCell);
      }

      // down
      if (evt.keyCode === TKeyboard.down) {
        const nextCell = toDown(activeCell);
        if (activeGraphNode?.has(nextCell)) setActiveCellId(nextCell);
      }

      // left
      if (evt.keyCode === TKeyboard.left) {
        const nextCell = toLeft(activeCell);
        if (activeGraphNode?.has(nextCell)) setActiveCellId(nextCell);
      }

      // left
      if (evt.keyCode === TKeyboard.up) {
        const nextCell = toUp(activeCell);
        if (activeGraphNode?.has(nextCell)) setActiveCellId(nextCell);
      }
    },
    [activeCellId, graph]
  );

  useEffect(() => {
    // go to the next cell
    path.current.add(activeCellId);
    setStep((i) => ++i);
  }, [activeCellId]);

  useEffect(() => {
    // reattach listener
    document.addEventListener('keydown', handler);

    // reaches the traget
    if (activeCellId === outputCellId) {
      document.removeEventListener('keydown', handler);
    }

    // cleanup
    return () => document.removeEventListener('keydown', handler);
  }, [handler]);

  // reset state for the new graph
  useEffect(() => {
    setStep(0);
    setActiveCellId(inputCellId);
    path.current.clear();
    path.current.add(inputCellId);
  }, [graph]);

  return { activeCellId, path: path.current, currentStep };
}

type TNodeId = number[];
const toRight = ([x, y]: TNodeId) => [x + 1, y].toString();
const toDown = ([x, y]: TNodeId) => [x, y + 1].toString();
const toLeft = ([x, y]: TNodeId) => [x - 1, y].toString();
const toUp = ([x, y]: TNodeId) => [x, y - 1].toString();
