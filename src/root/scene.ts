import Graph from '~/utils/graph';

const scene = new Graph(25, 0.3);

export const createScene = () => {
  scene.setGrid();
  scene.setGraph();
  scene.addPath('friend');
  scene.addPath('enemy');
  scene.addPath('enemy');
  return scene;
};

createScene();
export default scene;
