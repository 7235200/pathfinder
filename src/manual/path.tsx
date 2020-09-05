import { h } from 'preact';

import { Path } from '~/Grid';

type TProps = { path: Set<string>; activeIdx: string; outputIdx: string };

const ManualPath = ({ path, activeIdx, outputIdx }: TProps) => (
  <Path theme="manual" {...{ path, activeIdx, outputIdx }} />
);

export default ManualPath;
