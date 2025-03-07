import {
  OrbitControls,
  OrthographicCamera,
  PointerLockControls,
} from "@react-three/drei";
import Ground from "./Ground";
import Level1 from "./Level1";
import PlayerController from "./PlayerController";
import { useRef } from "react";
import * as THREE from "three";
import Player from "./Player";

export default function Experience() {
  const shadowCameraRef = useRef<THREE.OrthographicCamera | null>(null);
  return (
    <>
      {/* <OrbitControls /> */}
      <PointerLockControls />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        {/* <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        /> */}
      </directionalLight>
      <Ground />
      <Level1 />
      <Player />
    </>
  );
}
