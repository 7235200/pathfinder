import { useState, useCallback } from 'preact/compat';

export enum TKeyboard {
  left = 37,
  up = 38,
  right = 39,
  down = 40,
}

export const useRerender = () => {
  const [_, setState] = useState({});
  return useCallback(() => {
    setState({});
  }, []);
};
