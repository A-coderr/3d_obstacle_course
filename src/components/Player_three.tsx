import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Stats } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

function Scene() {
  const { scene, animations } = useGLTF("/models/eve$@walk.glb");
  const { camera } = useThree();
  const [mixer] = useState(() => new THREE.AnimationMixer(scene));
  const [actions, setActions] = useState<{
    [key: string]: THREE.AnimationAction;
  }>({});
  const [activeAction, setActiveAction] =
    useState<THREE.AnimationAction | null>(null);
  const keyMap = useRef<{ [key: string]: boolean }>({});
  const clock = new THREE.Clock();
  let speed = 0,
    toSpeed = 0;

  useEffect(() => {
    async function loadAnimations() {
      const loader = new THREE.GLTFLoader();
      const [idle, run] = await Promise.all([
        loader.loadAsync("/models/eve@idle.glb"),
        loader.loadAsync("/models/eve@run.glb"),
      ]);

      const newActions = {
        idle: mixer.clipAction(idle.animations[0]),
        walk: mixer.clipAction(animations[0]),
        run: mixer.clipAction(run.animations[0]),
      };
      newActions.idle.play();
      setActions(newActions);
      setActiveAction(newActions.idle);
    }
    loadAnimations();
  }, [mixer, animations]);

  useEffect(() => {
    const onKeyChange = (e: KeyboardEvent) => {
      keyMap.current[e.code] = e.type === "keydown";
    };
    window.addEventListener("keydown", onKeyChange);
    window.addEventListener("keyup", onKeyChange);
    return () => {
      window.removeEventListener("keydown", onKeyChange);
      window.removeEventListener("keyup", onKeyChange);
    };
  }, []);

  useFrame(() => {
    const delta = clock.getDelta();
    mixer.update(delta);
    if (keyMap.current["KeyW"]) {
      if (keyMap.current["ShiftLeft"]) {
        if (activeAction !== actions.run) {
          activeAction?.fadeOut(0.5);
          actions.run.reset().fadeIn(0.25).play();
          setActiveAction(actions.run);
          toSpeed = 4;
        }
      } else {
        if (activeAction !== actions.walk) {
          activeAction?.fadeOut(0.5);
          actions.walk.reset().fadeIn(0.25).play();
          setActiveAction(actions.walk);
          toSpeed = 1;
        }
      }
    } else {
      if (activeAction !== actions.idle) {
        activeAction?.fadeOut(0.5);
        actions.idle.reset().fadeIn(0.25).play();
        setActiveAction(actions.idle);
        toSpeed = 0;
      }
    }
    speed = THREE.MathUtils.lerp(speed, toSpeed, delta * 10);
  });

  return (
    <>
      <primitive object={scene} />
      <gridHelper args={[100, 100]} />
      <Environment files="/img/venice_sunset_1k.hdr" background />
    </>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0.1, 1, 1], fov: 75 }}>
      <Scene />
      <OrbitControls enableDamping target={[0, 0.75, 0]} />
      <Stats />
    </Canvas>
  );
}
