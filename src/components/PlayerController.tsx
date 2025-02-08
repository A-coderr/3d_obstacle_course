import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Vector3 } from "three";
import { Box, Capsule, Plane, useKeyboardControls } from "@react-three/drei";
import { useControls } from "leva";
import { degToRad, MathUtils } from "three/src/math/MathUtils.js";

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

export default function PlayerController() {
  const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED } = useControls(
    "Player Control",
    {
      WALK_SPEED: { value: 3, min: 0.1, max: 4, step: 0.1 },
      RUN_SPEED: { value: 6, min: 0.2, max: 12, step: 0.1 },
      ROTATION_SPEED: {
        value: degToRad(3),
        min: degToRad(0.1),
        max: degToRad(5),
        step: degToRad(0.1),
      },
    }
  );
  const rotationTarget = useRef(0);
  const characterRotationTarget = useRef(0);
  const rb = useRef();
  const container = useRef();
  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const character = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const [, get] = useKeyboardControls();

  useFrame(({ camera }) => {
    if (rb.current) {
      const vel = rb.current.linvel();
      const movement = {
        x: 0,
        z: 0,
      };
      if (get().forward) {
        movement.z = 1;
        console.log("forward");
      }
      if (get().backward) {
        movement.z = -1;
        console.log("backward");
      }

      if (get().left) {
        movement.x = 1;
        console.log("left");
      }
      if (get().right) {
        movement.x = -1;
        console.log("right");
      }
      let speed = get().run ? RUN_SPEED : WALK_SPEED;

      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x;
      }
      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        vel.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) *
          speed;
        vel.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) *
          speed;
      }
      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.1
      );
      rb.current.setLinvel(vel, true);
    }
    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );
    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);
      camera.lookAt(cameraLookAt.current);
    }
  });
  return (
    <RigidBody ref={rb} lockRotations>
      <group ref={container}>
        <group ref={cameraTarget} position-z={10}></group>
        <group ref={cameraPosition} position-y={2.5} position-z={0.5}></group>
        <group ref={character}>
          <Capsule scale={0.4} position={[0, 1.5, 0]}>
            <meshStandardMaterial color="red" visible={false} />
          </Capsule>
        </group>
      </group>
    </RigidBody>
  );
}
