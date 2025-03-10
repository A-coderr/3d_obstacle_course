import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider, vec3 } from "@react-three/rapier";
import { Vector3, Euler, Quaternion } from "three";
import Player from "./Player";

/**
 * A player controller component that manages player movement and rotation.
 * It uses the Keyboard API to listen for key presses and determine the player's movement.
 * It also uses the RigidBody component from react-three/rapier to apply forces to the player's rigid body.
 * The component also renders a Player component to display the player mesh.
 *
 * @returns {React.Element} A RigidBody component with a CapsuleCollider and a Player component
 */
const PlayerController: React.FC = () => {
  const rigidBodyRef = useRef<React.ElementRef<typeof RigidBody>>(null);
  const [isWalking, setIsWalking] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  const [isGrounded, setIsGrounded] = useState(true);

  const walkSpeed = 2;
  const runSpeed = 5;
  const jumpForce = 15;
  const rotationSpeed = 0.05;

  const keys = useRef<{ [key: string]: boolean }>({
    w: false,
    a: false,
    d: false,
    shift: false,
    s: false,
  });

  useEffect(() => {
    /**
     * ✅Handles keydown events. Sets the corresponding key in the keys ref to true.
     * @param {KeyboardEvent} event - The keydown event.
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      keys.current[event.key.toLowerCase()] = true;
    };

    /**
     * ✅Handles keyup events. Sets the corresponding key in the keys ref to false.
     * @param {KeyboardEvent} event - The keyup event.
     */
    const handleKeyUp = (event: KeyboardEvent) => {
      keys.current[event.key.toLowerCase()] = false;
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

    //🔥Checking pressed keys inside useFrame to prevent race conditions
    const walking = keys.current.w;
    const running = walking && keys.current.shift;
    const jumping = keys.current.s && isGrounded;

    setIsWalking(walking);
    setIsRunning(running);

    if (jumping) {
      setIsJumping(true);
      setIsGrounded(false);
    }

    if (keys.current.a) {
      setRotationY((prev) => prev + rotationSpeed);
    }
    if (keys.current.d) {
      setRotationY((prev) => prev - rotationSpeed);
    }

    const quaternion = new Quaternion().setFromEuler(
      new Euler(0, rotationY, 0)
    );
    rigidBodyRef.current.setRotation(quaternion, true);

    const movementSpeed = isRunning ? runSpeed : walkSpeed;

    if (isWalking) {
      const forward = new Vector3(0, 0, movementSpeed).applyQuaternion(
        quaternion
      );
      rigidBodyRef.current.setLinvel(vec3(forward), true);
    } else {
      rigidBodyRef.current.setLinvel(vec3({ x: 0, y: 0, z: 0 }), true);
    }

    if (jumping) {
      rigidBodyRef.current.applyImpulse(
        vec3({ x: 0, y: jumpForce, z: 0 }),
        true
      );
    }

    // Check if the player is on the ground
    const velocity = rigidBodyRef.current.linvel();
    if (velocity.y === 0) {
      setIsGrounded(true);
      setIsJumping(false);
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
      <Player
        isWalking={isWalking}
        isRunning={isRunning}
        isJumping={isJumping}
      />
    </RigidBody>
  );
};

export default PlayerController;
