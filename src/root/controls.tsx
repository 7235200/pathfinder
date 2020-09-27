import { useEffect, useCallback } from 'preact/hooks';
import { TKeyboard } from '~/utils/useDom';

type TProps = {
  onCreateScene(): void;
};

export function useSceneControls({ onCreateScene }: TProps) {
  const handler = useCallback((evt: KeyboardEvent) => {
    if (evt.keyCode === TKeyboard.space) onCreateScene();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handler);
    return document.addEventListener('keydown', handler);
  }, [handler]);
}
