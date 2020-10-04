import css from './styles.mod.css';
import { h } from 'preact';
import { memo, useMemo } from 'preact/compat';

import { Frame } from '~/grid';

import ManualPath, { useManualPath } from '~/manual';
import EnemyPath, { useEnemyPath } from '~/enemy';
import scene, { createScene } from './scene';
import { useSceneControls } from './controls';
import Header from './header';

import useGameStatus from './useGameStatus';

const Root = () => {
  const friend = window.orDie(scene.friend);

  // register friend path to render
  const manualPath = useManualPath(scene.graph, friend, () => onFindFriend());

  // register enemy paths to render
  const enemyPaths = scene.enemies.map((enemy) =>
    useEnemyPath(enemy.path, manualPath.activeCellId, () => onGetCaught())
  );

  // memoize all paths
  const paths = useMemo(() => [manualPath, ...enemyPaths], [
    manualPath,
    enemyPaths,
  ]);

  // handle game status
  const { status, onCreateScene, onFindFriend, onGetCaught } = useGameStatus({
    createScene,
    paths,
  });

  // keyboard game controls
  useSceneControls({ onCreateScene });

  return (
    <section className={css.container}>
      <Header {...{ status }} />

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
