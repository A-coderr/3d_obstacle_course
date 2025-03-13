import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { RapierRigidBody } from "@react-three/rapier";

type CameraControllerProps = {
  playerRef: React.RefObject<RapierRigidBody | null>;
};

/**
 * CameraController is a component that manages the camera's position and orientation
 * relative to a player in a 3D scene. It uses a fixed offset to place the camera
 * behind the player and ensures the camera follows and looks at the player during
 * movement. The component relies on the `useFrame` hook to update the camera's
 * position every frame based on the player's current position and rotation.
 *
 * @param {Object} props - The component props.
 * @param {React.RefObject<RapierRigidBody | null>} props.playerRef - A ref to the player's rigid body,
 * used to track the player's position and rotation.
 * @returns {JSX.Element} A PerspectiveCamera component that follows the player.
 */

export function CameraController({ playerRef }: CameraControllerProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const offset = new THREE.Vector3(0, 2, -3); //Fixed offset behind the player

  useFrame(() => {
    if (!playerRef.current || !cameraRef.current) return;

    //Gets player's exact position and rotation
    const playerPosition = playerRef.current.translation();
    const playerRotation = playerRef.current.rotation();

    //Converts quaternion rotation to Euler angles (w represents the amount of rotation around the axis)
    const quaternion = new THREE.Quaternion(
      playerRotation.x,
      playerRotation.y,
      playerRotation.z,
      playerRotation.w
    );

    //Applies player's rotation to the camera offset to stay behind
    const rotatedOffset = offset.clone().applyQuaternion(quaternion);

    //Instantly updates the camera position
    cameraRef.current.position.set(
      playerPosition.x + rotatedOffset.x,
      playerPosition.y + rotatedOffset.y,
      playerPosition.z + rotatedOffset.z
    );

    //Ensures the camera looks at the player's front
    cameraRef.current.lookAt(
      playerPosition.x,
      playerPosition.y + 1,
      playerPosition.z
    );
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={75} />;
}
