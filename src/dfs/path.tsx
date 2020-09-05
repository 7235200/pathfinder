import { h } from 'preact';
import { memo } from 'preact/compat';

import { Path } from '~/Grid';

type TProps = { path: Set<string>; activeIdx: string; outputIdx: string };

const DfsPath = ({ path, activeIdx, outputIdx }: TProps) => (
  <Path theme="dfs" {...{ path, activeIdx, outputIdx }} />
);

export default memo(DfsPath);
