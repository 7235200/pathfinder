import type Graph from '~/utils/graph';
import { useState, useCallback } from 'preact/hooks';

export type TGameStatus = 'win' | 'loss' | 'playing' | 'pending';
type TPros = {
  createScene(): Graph;
  paths: { stop(): void }[];
};

export default function useGameStatus({ createScene, paths }: TPros) {
  const [status, setStatus] = useState<TGameStatus>('playing');

  const onCreateScene = useCallback(async () => {
    setStatus('pending');

    setTimeout(() => {
      // heavy operation
      createScene();
      setStatus('playing');
    }, 0);
  }, [createScene]);

  const onFindFriend = useCallback(() => {
    paths.forEach((path) => path.stop());
    setStatus('win');
  }, [paths]);

  const onGetCaught = useCallback(() => {
    paths.forEach((path) => path.stop());
    setStatus('loss');
  }, [paths]);

  return {
    status,
    onCreateScene,
    onFindFriend,
    onGetCaught,
  };
}
