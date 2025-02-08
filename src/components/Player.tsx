import { Vector3 } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";

export interface PlayerProps {
  position: Vector3;
  color?: string;
}

function Player({ position }: PlayerProps) {
  return (
    <RigidBody
      colliders={false}
      mass={1}
      type="dynamic"
      position={position}
      scale={0.4}
    >
      <mesh>
        <capsuleGeometry />
        <meshStandardMaterial color="blue" />
      </mesh>
    </RigidBody>
  );
}

export default Player;
