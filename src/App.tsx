import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";

import "./App.css";
import { Suspense } from "react";
import Loader from "./components/Loader";
import { Physics } from "@react-three/rapier";
import { Environment } from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas
      resize={{ polyfill: ResizeObserver }}
      camera={{ position: [0, 1.5, 5] }}
    >
      <Suspense fallback={<Loader />}>
        <gridHelper args={[2000, 2000, 0xff22aa, 0x55ccff]} />
        {/* <Perf position="top-left" /> */}
        <Environment preset="city" />
        <Physics>
          <Experience />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
