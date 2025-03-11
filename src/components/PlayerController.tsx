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
  const jumpForce = 9;
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

  // ✅ Handle ground collision detection
  const handleCollisionEnter = (event: any) => {
    const otherObjectName = event.other?.colliderObject?.name;
    console.log("Collided with:", otherObjectName);

    if (otherObjectName === "ground") {
      console.log("Landed on ground! Resetting jump.");
      setIsGrounded(true);
      setIsJumping(false);
    }
  };

  const handleCollisionExit = () => {
    setIsGrounded(false);
  };

  useFrame(() => {
    if (!rigidBodyRef.current) return;

    //🔥Checking pressed keys inside useFrame to prevent race conditions
    const walking = keys.current.w;
    const running = walking && keys.current.shift;
    const jumpPressed = keys.current.s;

    setIsWalking(walking);
    setIsRunning(running);

    // 🟢 Apply jump instantly when 'S' is pressed (while grounded)
    if (jumpPressed && isGrounded) {
      console.log("Jumping! Applying impulse.");
      rigidBodyRef.current.applyImpulse(
        vec3({ x: 0, y: jumpForce, z: 0 }),
        true
      );
      setIsJumping(true);
      setIsGrounded(false); // Prevent repeated jumps mid-air
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
    const velocity = rigidBodyRef.current.linvel();

    if (isWalking || isJumping) {
      const forward = new Vector3(0, velocity.y, movementSpeed).applyQuaternion(
        quaternion
      );
      rigidBodyRef.current.setLinvel(vec3(forward), true);
    } else {
      // Stop movement if not walking or jumping
      rigidBodyRef.current.setLinvel(vec3({ x: 0, y: velocity.y, z: 0 }), true);
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="dynamic"
      position={[0, 1, 0]}
      gravityScale={2}
      colliders={false}
      mass={1}
      angularDamping={5}
      linearDamping={0}
      lockRotations={true}
      onCollisionEnter={handleCollisionEnter} // ✅ Detect when touching ground
      onCollisionExit={handleCollisionExit} // ✅ Detect when leaving ground
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
