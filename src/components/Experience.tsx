import Ground from "./Ground";
import Level1 from "./Level1";
import PlayerController from "./PlayerController";

export default function Experience() {
  return (
    <>
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      ></directionalLight>
      <Ground />
      <Level1 />
      <PlayerController />
    </>
  );
}
