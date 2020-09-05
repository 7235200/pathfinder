import { h } from 'preact';
import { memo } from 'preact/compat';
import useManualPath from './useManualPath';

import { Path } from '~/Grid';
import { TGraphInstance } from '~/utils/graph';

type TProps = { graph: TGraphInstance; inputIdx: string; outputIdx: string };

const ManualPath = ({ graph, inputIdx, outputIdx }: TProps) => {
  const { activeIdx, path } = useManualPath(graph, inputIdx, outputIdx);
  return <Path theme="manual" {...{ path, activeIdx, outputIdx }} />;
};

export default memo(ManualPath);
