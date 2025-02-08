import { Gltf, OrbitControls, Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import warehouse from "../assets/models/Warehouse_TurboSquid_V8.glb";
import Player from "./Player";
import PlayerController from "./PlayerController";

export default function Experience() {
  return (
    <>
      <directionalLight position={[0, 0, 2]} intensity={0.4} />
      {/* <OrbitControls /> */}
      <PlayerController />

      {/* <RigidBody type="fixed">
        <Box position={[0, -1, 0]} args={[1000, 1, 1000]}>
          <meshStandardMaterial color="lightblue" />
        </Box>
      </RigidBody> */}
      <RigidBody type="fixed" colliders="trimesh" position={[3, 0, -18]}>
        <Gltf scale={1} src={warehouse} />
      </RigidBody>
    </>
  );
}
