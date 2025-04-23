import { useRef } from "react";
import { RigidBody, CollisionEnterPayload } from "@react-three/rapier";
import { useDispatch, useSelector } from "react-redux";
import { collectItem } from "../store/gameSlice";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { RootState } from "../store/store";

interface CollectibleProps {
  id: string;
  position: [number, number, number];
}

/**
 * A collectible component that renders a rotating, gold-colored mesh with a dodecahedron geometry.
 * When it collides with a rigid body named "player", it dispatches the collectItem action with the given id.
 * When it is collected, it is removed from the scene.
 * @param {{ id: string; position: [number, number, number] }} props - The id of the collectible and its position.
 * @returns {React.ReactElement} A RigidBody component with a rotating mesh inside.
 */
const Collectible: React.FC<CollectibleProps> = ({ id, position }) => {
  const ref = useRef<Mesh>(null);
  const dispatch = useDispatch();
  const isCollected = useSelector((state: RootState) =>
    state.game.collected.includes(id)
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta; //Rotates for visual effect.
    }
  });

  const handleCollisionEnter = (event: CollisionEnterPayload) => {
    console.log("Collision Event:", event);
    if (event.other.rigidBodyObject?.name === "player" && !isCollected) {
      dispatch(collectItem(id));
    }
  };

  if (isCollected) return null;

  return (
    <RigidBody
      position={position}
      type="fixed"
      colliders="ball"
      onCollisionEnter={handleCollisionEnter}
    >
      <mesh ref={ref} scale={[0.5, 0.5, 0.5]} name={`collectible-${id}`}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="gold" emissive="yellow" />
      </mesh>
    </RigidBody>
  );
};

export default Collectible;
