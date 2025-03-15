import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  AnimationMixer,
  Group,
  AnimationAction,
  LoopRepeat,
  AnimationUtils,
} from "three";
import * as THREE from "three";

interface PlayerProps {
  isWalking: boolean;
  isRunning: boolean;
  isJumping: boolean;
  isTurningLeft: boolean;
  isTurningRight: boolean;
}

const Player: React.FC<PlayerProps> = ({
  isWalking,
  isRunning,
  isJumping,
  isTurningLeft,
  isTurningRight,
}) => {
  const { scene, animations } = useGLTF(
    "assets/models/player/vegas@walk.glb"
  ) as unknown as {
    scene: Group;
    animations: THREE.AnimationClip[];
  };

  const { animations: idleAnimations } = useGLTF(
    "assets/models/player/vegas@idle.glb"
  ) as unknown as {
    animations: THREE.AnimationClip[];
  };

  const { animations: runAnimations } = useGLTF(
    "assets/models/player/vegas@run.glb"
  ) as unknown as {
    animations: THREE.AnimationClip[];
  };

  const { animations: jumpAnimations } = useGLTF(
    "assets/models/player/vegas@jump.glb"
  ) as unknown as {
    animations: THREE.AnimationClip[];
  };

  const { animations: leftTurnAnimations } = useGLTF(
    "assets/models/player/vegas@leftturn.glb"
  ) as unknown as {
    animations: THREE.AnimationClip[];
  };

  const { animations: rightTurnAnimations } = useGLTF(
    "assets/models/player/vegas@rightturn.glb"
  ) as unknown as {
    animations: THREE.AnimationClip[];
  };

  const { animations: runJumpAnimations } = useGLTF(
    "assets/models/player/vegas@runjump.glb"
  ) as unknown as {
    animations: THREE.AnimationClip[];
  };

  const mixerRef = useRef<AnimationMixer | null>(null);
  const actionsRef = useRef<{
    idle?: AnimationAction;
    walk?: AnimationAction;
    run?: AnimationAction;
    jump?: AnimationAction;
    leftturn?: AnimationAction;
    rightturn?: AnimationAction;
    runjump?: AnimationAction;
  }>({});

  useEffect(() => {
    if (!animations.length || !idleAnimations.length || !runAnimations.length)
      return;

    mixerRef.current = new AnimationMixer(scene);

    // Use subclip to extract the jump animation as not the entire clip is needed
    const jumpClip = AnimationUtils.subclip(jumpAnimations[0], "jump", 15, 50);

    actionsRef.current.walk = mixerRef.current.clipAction(animations[0]);
    actionsRef.current.idle = mixerRef.current.clipAction(idleAnimations[0]);
    actionsRef.current.run = mixerRef.current.clipAction(runAnimations[0]);
    actionsRef.current.jump = mixerRef.current
      .clipAction(jumpClip)
      .setEffectiveTimeScale(0.5);
    actionsRef.current.leftturn = mixerRef.current
      .clipAction(leftTurnAnimations[0])
      .setEffectiveTimeScale(2.0);
    actionsRef.current.rightturn = mixerRef.current
      .clipAction(rightTurnAnimations[0])
      .setEffectiveTimeScale(2.0);
    actionsRef.current.runjump = mixerRef.current.clipAction(
      runJumpAnimations[0]
    );

    actionsRef.current.walk.setLoop(LoopRepeat, Infinity);
    actionsRef.current.idle.setLoop(LoopRepeat, Infinity);
    actionsRef.current.run.setLoop(LoopRepeat, Infinity);
    actionsRef.current.jump.setLoop(LoopRepeat, Infinity);
    actionsRef.current.leftturn.setLoop(LoopRepeat, Infinity);
    actionsRef.current.rightturn.setLoop(LoopRepeat, Infinity);
    actionsRef.current.runjump.setLoop(LoopRepeat, Infinity);

    actionsRef.current.idle.play();
  }, [
    animations,
    idleAnimations,
    runAnimations,
    jumpAnimations,
    leftTurnAnimations,
    rightTurnAnimations,
    runJumpAnimations,
    scene,
  ]);

  useEffect(() => {
    if (!mixerRef.current) return;

    if (isJumping && isWalking) {
      actionsRef.current.idle?.stop();
      actionsRef.current.run?.stop();
      actionsRef.current.walk?.stop();
      actionsRef.current.rightturn?.stop();
      actionsRef.current.leftturn?.stop();
      actionsRef.current.jump?.stop();
      actionsRef.current.runjump?.play();
    } else if (isJumping) {
      actionsRef.current.idle?.stop();
      actionsRef.current.run?.stop();
      actionsRef.current.walk?.stop();
      actionsRef.current.rightturn?.stop();
      actionsRef.current.leftturn?.stop();
      actionsRef.current.runjump?.stop();
      actionsRef.current.jump?.play();
    } else if (isRunning && isWalking) {
      actionsRef.current.idle?.stop();
      actionsRef.current.walk?.stop();
      actionsRef.current.jump?.stop();
      actionsRef.current.rightturn?.stop();
      actionsRef.current.leftturn?.stop();
      actionsRef.current.runjump?.stop();
      actionsRef.current.run?.play();
    } else if (isWalking) {
      actionsRef.current.idle?.stop();
      actionsRef.current.run?.stop();
      actionsRef.current.jump?.stop();
      actionsRef.current.rightturn?.stop();
      actionsRef.current.leftturn?.stop();
      actionsRef.current.runjump?.stop();
      actionsRef.current.walk?.play();
    } else if (isTurningLeft) {
      actionsRef.current.idle?.stop();
      actionsRef.current.run?.stop();
      actionsRef.current.jump?.stop();
      actionsRef.current.walk?.stop();
      actionsRef.current.rightturn?.stop();
      actionsRef.current.runjump?.stop();
      actionsRef.current.leftturn?.play();
    } else if (isTurningRight) {
      actionsRef.current.idle?.stop();
      actionsRef.current.run?.stop();
      actionsRef.current.jump?.stop();
      actionsRef.current.walk?.stop();
      actionsRef.current.leftturn?.stop();
      actionsRef.current.runjump?.stop();
      actionsRef.current.rightturn?.play();
    } else {
      actionsRef.current.walk?.stop();
      actionsRef.current.run?.stop();
      actionsRef.current.jump?.stop();
      actionsRef.current.rightturn?.stop();
      actionsRef.current.leftturn?.stop();
      actionsRef.current.runjump?.stop();
      actionsRef.current.idle?.play();
    }
  }, [isWalking, isRunning, isJumping, isTurningLeft, isTurningRight]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return <primitive object={scene} scale={1} position={[0, -1, 0]} />;
};

export default Player;
