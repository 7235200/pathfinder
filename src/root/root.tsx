import css from './styles.mod.css';
import { h } from 'preact';
import { memo, useState } from 'preact/compat';

import { Frame } from '~/grid';

import { useRerender } from '~/utils/useDom';
import ManualPath, { useManualPath } from '~/manual';
import EnemyPath, { useEnemyPath } from '~/enemy';
import scene, { createScene } from './scene';

const Root = () => {
  const [endGame, setEndGame] = useState('');

  const rerender = useRerender();
  const friend = window.orDie(scene.friend);

  const onCreateScene = () => {
    createScene();
    rerender();
  };

  const onFindFriend = () => {
    manualPath.stop();
    enemyPaths.forEach((e) => e.stop());
    setEndGame('win');
  };

  const onGetCaught = () => {
    manualPath.stop();
    enemyPaths.forEach((e) => e.stop());
    setEndGame('lose');
  };

  // register friend path to render
  const manualPath = useManualPath(scene.graph, friend, onFindFriend);

  // register enemy paths to render
  const enemyPaths = scene.enemies.map((enemy) =>
    useEnemyPath(enemy.path, manualPath.activeCellId, onGetCaught)
  );

  return (
    <section className={css.container}>
      <Frame
        source={scene.grid}
        activeCellId={manualPath.activeCellId}
        outputCellId={window.orDie(friend.outputCellId)}
      >
        <ManualPath
          path={friend.path}
          activeCellId={manualPath.activeCellId}
          outputCellId={window.orDie(friend.outputCellId)}
        />
        {scene.enemies.map((enemy, idx) => (
          <EnemyPath
            path={enemy.path}
            activeCellId={enemyPaths[idx].activeIdx}
          />
        ))}
      </Frame>
    </section>
  );
};

export default memo(Root);
