import { h } from 'preact';

import Graph, { TSource } from './utils/graph';
import Grid from './utils/grid';

const App = () => {
  const grid = new Grid(10, 10, 0.5);
  const graph = new Graph(grid.instance);

  graph.print();

  return <div>lol</div>;
};

export default App;
