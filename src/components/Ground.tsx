import { CuboidCollider, RigidBody } from "@react-three/rapier";

function Ground() {
  return (
    <RigidBody type="fixed">
      <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="green" />
      </mesh>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
    </RigidBody>
  );
}

export default Ground;
