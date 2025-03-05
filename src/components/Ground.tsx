import { RigidBody } from "@react-three/rapier";

function Ground() {
  return (
    <RigidBody type="fixed" restitution={0.5} friction={1}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </RigidBody>
  );
}

export default Ground;
