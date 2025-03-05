import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import Player from "./Player";
import { useRef } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";

const PlayerController = () => {
  const WALK_SPEED = 6;
  const RUN_SPEED = 12;
  const rb = useRef();
  const container = useRef();
  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const player = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const [, get] = useKeyboardControls();

  useFrame(({ camera }) => {
    if (rb.current) {
      const vel = rb.current.linvel();
    }
    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);
      camera.lookAt(cameraLookAt.current);
    }
  });
  return (
    <RigidBody
      colliders={false}
      type="dynamic"
      lockRotations
      position={[0, 3, 0]}
      ref={rb}
    >
      <group ref={container}>
        <group ref={cameraTarget} position-z={-2}></group>
        <group ref={cameraPosition} position={[0, 9, 10]}></group>
        <group ref={player}>
          <Player />
        </group>
      </group>

      <CapsuleCollider args={[0.5, 0.5]} />
    </RigidBody>
  );
};

export default PlayerController;
