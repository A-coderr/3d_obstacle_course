import { Gltf } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const block = new URL(
  "../assets/models/platforms/grass_block.glb",
  import.meta.url
).href;

const Level1 = () => {
  return (
    <>
      <RigidBody type="fixed" colliders="trimesh" name="ground">
        <Gltf scale={2} src={block} position={[0, 0, 0]} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh" name="ground">
        <Gltf scale={2} src={block} position={[8, 0, 0]} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh" name="ground">
        <Gltf scale={2} src={block} position={[-8, 0, 0]} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh" name="ground">
        <Gltf scale={2} src={block} position={[0, 0, 8]} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh" name="ground">
        <Gltf scale={2} src={block} position={[0, 0, -8]} />
      </RigidBody>
    </>
  );
};

export default Level1;
