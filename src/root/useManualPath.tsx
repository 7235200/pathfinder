import { useRef, useEffect, useState } from 'preact/hooks';
import { TGraphInstance } from '~/utils/graph';

type TPath = Set<string>;

const keys = {
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

export default function useManualPath(
  initialCellId: string,
  graph: TGraphInstance,
  outputIndex: string
) {
  const [activeId, setActiveId] = useState<string>(initialCellId);
  const path = useRef<TPath>(new Set());
  const [currentStep, setStep] = useState<number>(0);
  const [isDone, done] = useState<boolean>(false);

  useEffect(() => {
    // listener callback
    const handler = (evt: KeyboardEvent) => {
      const activeCell = activeId.split(',').map(Number);
      const activeGraphNode = graph.get(activeId);

      // right
      if (evt.keyCode === keys.right) {
        const nextCell = toRight(activeCell);
        if (activeGraphNode?.has(nextCell)) setActiveId(nextCell);
      }

      // down
      if (evt.keyCode === keys.down) {
        const nextCell = toDown(activeCell);
        if (activeGraphNode?.has(nextCell)) setActiveId(nextCell);
      }

      // left
      if (evt.keyCode === keys.left) {
        const nextCell = toLeft(activeCell);
        if (activeGraphNode?.has(nextCell)) setActiveId(nextCell);
      }

      // left
      if (evt.keyCode === keys.up) {
        const nextCell = toUp(activeCell);
        if (activeGraphNode?.has(nextCell)) setActiveId(nextCell);
      }
    };

    // reattach listener
    document.addEventListener('keydown', handler);

    // go to the next cell
    path.current.add(activeId);
    setStep(i => ++i);

    // reaches the traget
    if (activeId === outputIndex) {
      done(true);
      document.removeEventListener('keydown', handler);
    }

    // cleanup
    return () => document.removeEventListener('keydown', handler);
  }, [activeId]);

  // reset state for the new graph
  useEffect(() => {
    setStep(0);
    done(false);
    path.current.clear();
    setActiveId(initialCellId);
  }, [graph]);

  return { activeId, path: path.current, currentStep, isDone };
}

type TNodeId = number[];
const toRight = ([x, y]: TNodeId) => [x + 1, y].toString();
const toDown = ([x, y]: TNodeId) => [x, y + 1].toString();
const toLeft = ([x, y]: TNodeId) => [x - 1, y].toString();
const toUp = ([x, y]: TNodeId) => [x, y - 1].toString();
