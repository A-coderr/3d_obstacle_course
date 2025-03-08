import { useEffect, useRef, useState } from "react";
import { RigidBody, CapsuleCollider, vec3 } from "@react-three/rapier";
import { Vector3 } from "three";
import Player from "./Player";

const PlayerController: React.FC = () => {
  const rigidBodyRef = useRef<React.ElementRef<typeof RigidBody>>(null);
  const [isWalking, setIsWalking] = useState(false);
  const speed = 2; // Adjust speed as needed

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "w") {
        setIsWalking(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "w") {
        setIsWalking(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const movePlayer = () => {
      if (!rigidBodyRef.current) return;

      if (isWalking) {
        const velocity = new Vector3(0, 0, speed); // Move forward
        rigidBodyRef.current.setLinvel(vec3(velocity), true);
      } else {
        rigidBodyRef.current.setLinvel(vec3({ x: 0, y: 0, z: 0 }), true); // Stop movement
      }
    };

    const interval = setInterval(movePlayer, 16); // Run every frame (approx 60fps)
    return () => clearInterval(interval);
  }, [isWalking]);

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="dynamic"
      position={[0, 1, 0]}
      colliders={false}
      mass={1}
      angularDamping={5} // Prevents unwanted rotation
      linearDamping={0.5} // Adds slight movement resistance
      lockRotations={true} // Ensures player doesn't fall over
    >
      {/* Capsule Collider for Player */}
      <CapsuleCollider args={[0.5, 0.5]} />

      {/* Render the Player model and animations */}
      <Player isWalking={isWalking} />
    </RigidBody>
  );
};

export default PlayerController;
