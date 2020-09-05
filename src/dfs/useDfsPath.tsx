import { TGraphInstance } from '~/utils/graph';
import { useState, useRef, useEffect } from 'preact/hooks';
import Dfs from '~/utils/dfs';
import usePath from '~/utils/usePath';

export default function useDfsPath(
  graph: TGraphInstance,
  inputIdx: string,
  outputIdx: string
) {
  const { current: dfs } = useRef(new Dfs(graph, inputIdx, outputIdx));
  const [path, setPath] = useState(dfs.instance);

  useEffect(() => {
    dfs.search(graph);
    setPath(dfs.instance);
  }, [graph]);

  const { run, stop, activeIdx, currentStep } = usePath(path);
  return { path, run, stop, activeIdx, currentStep, success: dfs.success };
}
