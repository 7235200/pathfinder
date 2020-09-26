import { h } from 'preact';
import { memo } from 'preact/compat';

import Frame from './frame';
import ManualPath, { useManualPath } from '~/manual';
import DfsPath from '~/dfs';
import { TGridInstance } from '~/utils/grid';
import usePath from '~/utils/usePath';

type TProps = {
  dfs: ReturnType<typeof usePath>;
  manual: ReturnType<typeof useManualPath>;
  source: TGridInstance;
  outputCellId: string;
};

const Grid = ({ dfs, manual, source, outputCellId }: TProps) => (
  <Frame {...{ source, outputCellId }} activeIdx={manual.activeCellId}>
    <DfsPath
      path={dfs.path}
      activeIdx={dfs.activeIdx}
      outputIdx={outputCellId}
    />
    <ManualPath
      path={manual.path}
      activeIdx={manual.activeCellId}
      outputIdx={outputCellId}
    />
  </Frame>
);

export default memo(Grid);
