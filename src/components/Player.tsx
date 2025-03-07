import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { AnimationMixer, Group } from "three";
import * as THREE from "three";

const Player: React.FC = () => {
  const { scene, animations } = useGLTF(
    "/assets/models/player/vegas@walk.glb"
  ) as unknown as {
    scene: Group;
    animations: THREE.AnimationClip[];
  };

  const mixerRef = useRef<AnimationMixer | null>(null);

  useEffect(() => {
    if (animations.length > 0) {
      mixerRef.current = new AnimationMixer(scene);
      const action = mixerRef.current.clipAction(animations[0]);
      action.play();
    }
  }, [animations, scene]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <RigidBody type="dynamic">
      <primitive object={scene} scale={1} position={[0, 5, 0]} />
    </RigidBody>
  );
};

export default Player;
