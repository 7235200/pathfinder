import { h } from 'preact';

import { Path } from '~/Grid';
import { useEffect, useState } from 'preact/hooks';

type TProps = {
  path: Set<string>;
  activeIdx: string;
  outputIdx: string;
  onStart(): void;
};

const ManualPath = ({ path, activeIdx, outputIdx, onStart }: TProps) => {
  useEffect(() => {
    onStart();
  }, [path.size > 0]);

  return <Path theme="manual" {...{ path, activeIdx, outputIdx }} />;
};

export default ManualPath;
