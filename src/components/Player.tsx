import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { AnimationMixer, Group, AnimationAction, LoopRepeat } from "three";
import * as THREE from "three";

interface PlayerProps {
  isWalking: boolean;
  isRunning: boolean;
}

const Player: React.FC<PlayerProps> = ({ isWalking, isRunning }) => {
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

  const { animations: runAnimations } = useGLTF(
    "/assets/models/player/vegas@run.glb"
  ) as unknown as {
    animations: THREE.AnimationClip[];
  };

  const mixerRef = useRef<AnimationMixer | null>(null);
  const actionsRef = useRef<{
    idle?: AnimationAction;
    walk?: AnimationAction;
    run?: AnimationAction;
  }>({});

  useEffect(() => {
    if (!animations.length || !idleAnimations.length || !runAnimations.length)
      return;

    mixerRef.current = new AnimationMixer(scene);

    actionsRef.current.walk = mixerRef.current.clipAction(animations[0]);
    actionsRef.current.idle = mixerRef.current.clipAction(idleAnimations[0]);
    actionsRef.current.run = mixerRef.current.clipAction(runAnimations[0]);

    actionsRef.current.walk.setLoop(LoopRepeat, Infinity);
    actionsRef.current.idle.setLoop(LoopRepeat, Infinity);
    actionsRef.current.run.setLoop(LoopRepeat, Infinity);

    actionsRef.current.idle.play();
  }, [animations, idleAnimations, runAnimations, scene]);

  useEffect(() => {
    if (!mixerRef.current) return;

    if (isRunning && isWalking) {
      actionsRef.current.idle?.stop();
      actionsRef.current.walk?.stop();
      actionsRef.current.run?.play();
    } else if (isWalking) {
      actionsRef.current.idle?.stop();
      actionsRef.current.run?.stop();
      actionsRef.current.walk?.play();
    } else {
      actionsRef.current.walk?.stop();
      actionsRef.current.run?.stop();
      actionsRef.current.idle?.play();
    }
  }, [isWalking, isRunning]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return <primitive object={scene} scale={1} position={[0, -1, 0]} />;
};

export default Player;
