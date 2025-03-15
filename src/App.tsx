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

const HDR_PATH = new URL("./assets/sky.hdr", import.meta.url).href;

function App() {
  const { isLoading, isGameStarted } = useSelector(
    (state: RootState) => state.game
  );
  return (
    <>
      {!isLoading && <GameTimer isGameStarted={isGameStarted} />}
      <Canvas
        resize={{ polyfill: ResizeObserver }}
        camera={{ position: [3, 8, 3], near: 0.3, fov: 40 }}
      >
        <Suspense fallback={<Loader />}>
          {/* <gridHelper args={[2000, 2000, 0xff22aa, 0x55ccff]} /> */}
          {/* <Perf position="top-left" /> */}
          <Environment files={HDR_PATH} background />
          <Physics>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>

      {!isLoading && <StartScreen />}
    </>
  );
}
export default App;
