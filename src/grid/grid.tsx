import { h } from 'preact';
import { memo } from 'preact/compat';

import Frame from './frame';
import ManualPath, { useManualPath } from '~/manual';
import DfsPath, { useDfsPath } from '~/dfs';
import { TGridInstance } from '~/utils/grid';

type TProps = {
  dfs: ReturnType<typeof useDfsPath>;
  manual: ReturnType<typeof useManualPath>;
  source: TGridInstance;
  inputIdx: string;
  outputIdx: string;
};

const Grid = ({ dfs, manual, source, inputIdx, outputIdx }: TProps) => (
  <Frame {...{ source }} inputCellId={inputIdx} outputCellId={outputIdx}>
    <DfsPath path={dfs.path} activeIdx={dfs.activeIdx} {...{ outputIdx }} />
    <ManualPath
      path={manual.path}
      activeIdx={manual.activeIdx}
      onStart={dfs.run}
      {...{ outputIdx }}
    />
  </Frame>
);

export default memo(Grid);
