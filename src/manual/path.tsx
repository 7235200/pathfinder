import { h } from 'preact';

import { Path } from '~/grid';
import { useEffect } from 'preact/hooks';

type TProps = {
  path: Set<string>;
  activeIdx: string;
  outputIdx: string;
  onStart?(): void;
};

const ManualPath = ({ path, activeIdx, outputIdx, onStart }: TProps) => {
  useEffect(() => {
    if (onStart) onStart();
  }, [path.size > 0]);

  return <Path theme="manual" {...{ path, activeIdx, outputIdx }} />;
};

export default ManualPath;
