import { useEffect, useState, useCallback } from 'preact/hooks';
import { TGraphInstance } from '~/utils/graph';
import type Path from '~/utils/path';
import { useRerender, TKeyboard } from '~/utils/useDom';

export default function useManualPath(
  graph: TGraphInstance,
  friend: Path,
  onSuccess: () => void
) {
  const rerender = useRerender();
  const inputCellId = window.orDie(friend.inputCellId);

  const [activeCellId, setActiveCellId] = useState<string>(inputCellId);

  // reset state for the new graph
  useEffect(() => {
    setActiveCellId(inputCellId);
  }, [friend]);

  // next step
  useEffect(() => {
    friend.path.add(activeCellId);
    rerender();
  }, [activeCellId]);

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
    // reattach listener
    document.addEventListener('keydown', handler);

    // reaches the traget
    if (activeCellId === friend.outputCellId) {
      onSuccess();
      stop();
    }

    // cleanup
    return stop;
  }, [handler]);

  const stop = () => document.removeEventListener('keydown', handler);

  return { activeCellId, stop };
}

type TNodeId = number[];
const toRight = ([x, y]: TNodeId) => [x + 1, y].toString();
const toDown = ([x, y]: TNodeId) => [x, y + 1].toString();
const toLeft = ([x, y]: TNodeId) => [x - 1, y].toString();
const toUp = ([x, y]: TNodeId) => [x, y - 1].toString();
