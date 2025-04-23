import { Gltf } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import Collectible from "./Collectible";

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
      <Collectible id="gem1" position={[8, 3, 0]} />
      <Collectible id="gem2" position={[-8, 3, 0]} />
    </>
  );
};

export default Level1;
