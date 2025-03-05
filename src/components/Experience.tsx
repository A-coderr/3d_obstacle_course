import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Ground from "./Ground";
import Level1 from "./Level1";
import Player from "./Player";
import { useRef } from "react";

export default function Experience() {
  const shadowCameraRef = useRef();
  return (
    <>
      <OrbitControls />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>
      <Ground />
      <Level1 />
      <Player />
    </>
  );
}
