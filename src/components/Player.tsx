import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const Player = () => {
  return (
    <RigidBody colliders={false} mass={1} position={[0, 4, 0]}>
      <CapsuleCollider args={[0.5, 0.5]} />
      <mesh>
        <capsuleGeometry args={[0.5, 1, 8, 16]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </RigidBody>
  );
};

export default Player;
