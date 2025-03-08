import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { AnimationMixer, Group, AnimationAction, LoopRepeat } from "three";
import * as THREE from "three";

interface PlayerProps {
  isWalking: boolean;
}

const Player: React.FC<PlayerProps> = ({ isWalking }) => {
  const { scene, animations } = useGLTF(
    "/assets/models/player/vegas@walk.glb"
  ) as unknown as {
    scene: Group;
    animations: THREE.AnimationClip[];
  };

  const { animations: idleAnimations } = useGLTF(
    "/assets/models/player/vegas@idle.glb"
  ) as unknown as {
    animations: THREE.AnimationClip[];
  };

  const mixerRef = useRef<AnimationMixer | null>(null);
  const actionsRef = useRef<{ idle?: AnimationAction; walk?: AnimationAction }>(
    {}
  );

  useEffect(() => {
    if (!animations.length || !idleAnimations.length) return;

    // Create a new AnimationMixer for the model
    mixerRef.current = new AnimationMixer(scene);

    // Store animation actions
    actionsRef.current.walk = mixerRef.current.clipAction(animations[0]);
    actionsRef.current.idle = mixerRef.current.clipAction(idleAnimations[0]);

    // Ensure animations loop
    actionsRef.current.walk.setLoop(LoopRepeat, Infinity);
    actionsRef.current.idle.setLoop(LoopRepeat, Infinity);

    // Play idle animation by default
    actionsRef.current.idle.play();
  }, [animations, idleAnimations, scene]);

  useEffect(() => {
    if (!mixerRef.current) return;

    if (isWalking) {
      actionsRef.current.idle?.stop();
      actionsRef.current.walk?.play();
    } else {
      actionsRef.current.walk?.stop();
      actionsRef.current.idle?.play();
    }
  }, [isWalking]);

  // Ensure animations update in the render loop
  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return <primitive object={scene} scale={1} position={[0, -1, 0]} />;
};

export default Player;
