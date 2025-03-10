import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider, vec3 } from "@react-three/rapier";
import { Vector3, Euler, Quaternion } from "three";
import Player from "./Player";

const PlayerController: React.FC = () => {
  const rigidBodyRef = useRef<React.ElementRef<typeof RigidBody>>(null);
  const [isWalking, setIsWalking] = useState(false);
  const [isRunning, setIsRunning] = useState(false); // New state for running
  const [rotationY, setRotationY] = useState(0);

  const walkSpeed = 2;
  const runSpeed = 5; // Increased speed for running
  const rotationSpeed = 0.05;

  // Track key states
  const keys = useRef<{ [key: string]: boolean }>({
    a: false,
    d: false,
    Shift: false, // Track shift key for running
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "w") setIsWalking(true);
      if (event.key === "a") keys.current.a = true;
      if (event.key === "d") keys.current.d = true;
      if (event.key === "Shift") setIsRunning(true);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "w") setIsWalking(false);
      if (event.key === "a") keys.current.a = false;
      if (event.key === "d") keys.current.d = false;
      if (event.key === "Shift") setIsRunning(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!rigidBodyRef.current) return;

    // Apply rotation based on key input
    if (keys.current.a) {
      setRotationY((prev) => prev + rotationSpeed);
    }
    if (keys.current.d) {
      setRotationY((prev) => prev - rotationSpeed);
    }

    // Convert Euler rotation to Quaternion and apply it
    const quaternion = new Quaternion().setFromEuler(
      new Euler(0, rotationY, 0)
    );
    rigidBodyRef.current.setRotation(quaternion, true);

    // Determine speed based on walking or running state
    const movementSpeed = isRunning ? runSpeed : walkSpeed;

    // Move player forward in the rotated direction
    if (isWalking) {
      const forward = new Vector3(0, 0, movementSpeed).applyQuaternion(
        quaternion
      );
      rigidBodyRef.current.setLinvel(vec3(forward), true);
    } else {
      rigidBodyRef.current.setLinvel(vec3({ x: 0, y: 0, z: 0 }), true);
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="dynamic"
      position={[0, 1, 0]}
      colliders={false}
      mass={1}
      angularDamping={5}
      linearDamping={0.5}
      lockRotations={true}
    >
      <CapsuleCollider args={[0.5, 0.5]} />
      <Player isWalking={isWalking} isRunning={isRunning} />
    </RigidBody>
  );
};

export default PlayerController;
