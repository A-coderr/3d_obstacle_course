import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";

import "./App.css";
import { Suspense } from "react";
import Loader from "./components/UI/Loader";
import { Physics } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import StartScreen from "./components/UI/StartScreen";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import GameTimer from "./components/UI/GameTimer";
import PauseButton from "./components/UI/PauseButton";
import PauseScreen from "./components/UI/PauseScreen";
import ScoreDisplay from "./components/UI/ScoreDisplay";
import EndGameScreen from "./components/UI/EndGameScreen";
import FinishScreen from "./components/UI/FinishScreen";
import OnAssetsLoaded from "./components/UI/OnAssetLoaded";

const HDR_PATH = new URL("./assets/sky.hdr", import.meta.url).href;

function App() {
  const phase = useSelector((state: RootState) => state.game.phase);
  const resetCount = useSelector((state: RootState) => state.game.resetCount);
  console.log("App phase:", phase); //Log the current phase

  const isPlaying = phase === "PLAYING";
  const isPaused = phase === "PAUSED";
  const isInMenu = phase === "MAIN_MENU";
  const isGameOver = phase === "GAME_OVER";
  const isVictory = phase === "VICTORY";
  const isLoading = phase === "LOADING";

  return (
    <>
      {isInMenu && <StartScreen />}
      {isPaused && <PauseScreen />}
      {isGameOver && <EndGameScreen />}
      {isVictory && <FinishScreen />}

      {(isPlaying || isPaused) && (
        <>
          <GameTimer />
          <PauseButton />
          <ScoreDisplay />
        </>
      )}

      {(isPlaying || isPaused || isLoading) && (
        <Canvas
          resize={{ polyfill: ResizeObserver }}
          camera={{ position: [3, 8, 3], near: 0.3, fov: 40 }}
        >
          <Suspense fallback={<Loader />}>
            {isLoading && <OnAssetsLoaded />}
            {/* <gridHelper args={[2000, 2000, 0xff22aa, 0x55ccff]} /> */}
            {/* <Perf position="top-left" /> */}
            <Environment files={HDR_PATH} background />
            <Physics>
              <Experience key={resetCount} />
            </Physics>
          </Suspense>
        </Canvas>
      )}
    </>
  );
}
export default App;
