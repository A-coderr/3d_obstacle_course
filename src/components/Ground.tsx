import { CuboidCollider, RigidBody } from "@react-three/rapier";

function Ground() {
  return (
    <RigidBody type="fixed">
      {/* ✅ Add a collider so physics can detect the ground */}
      <CuboidCollider args={[500, 0.1, 500]} name="ground" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="grey" />
      </mesh>
      {/* 🔥 Optional: Debug Collider (Transparent Box) */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1000, 0.1, 1000]} />
        <meshBasicMaterial color="white" wireframe />
      </mesh>
    </RigidBody>
  );
}

export default Ground;
