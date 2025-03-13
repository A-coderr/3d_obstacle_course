import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { RapierRigidBody } from "@react-three/rapier";

type CameraControllerProps = {
  playerRef: React.RefObject<RapierRigidBody | null>;
};

export function CameraController({ playerRef }: CameraControllerProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (!playerRef.current || !cameraRef.current) return;

    // Get player's position and rotation
    const playerPosition = playerRef.current.translation();
    const playerRotation = playerRef.current.rotation(); // Quaternion rotation

    // Define offset for third-person perspective (behind the player)
    const offset = new THREE.Vector3(0, 2, -3);

    // Convert quaternion to Euler angles and apply to camera offset
    const eulerRotation = new THREE.Euler().setFromQuaternion(
      new THREE.Quaternion(
        playerRotation.x,
        playerRotation.y,
        playerRotation.z,
        playerRotation.w
      ),
      "YXZ"
    );

    // Rotate offset to stay behind the player
    const rotatedOffset = offset
      .clone()
      .applyEuler(new THREE.Euler(0, eulerRotation.y, 0));

    // Set camera position directly behind the player
    const targetPosition = new THREE.Vector3(
      playerPosition.x + rotatedOffset.x,
      playerPosition.y + rotatedOffset.y,
      playerPosition.z + rotatedOffset.z
    );

    // Instantly match camera position
    cameraRef.current.position.copy(targetPosition);

    // Ensure camera is always looking at the player's front
    const lookAtTarget = new THREE.Vector3(
      playerPosition.x,
      playerPosition.y + 1, // Slightly above the player for a better view
      playerPosition.z
    );
    cameraRef.current.lookAt(lookAtTarget);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={75} />;
}
