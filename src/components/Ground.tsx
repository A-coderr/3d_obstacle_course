import { RigidBody } from "@react-three/rapier";

function Ground() {
  return (
    <RigidBody type="fixed">
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="grey" />
      </mesh>
    </RigidBody>
  );
}

export default Ground;
