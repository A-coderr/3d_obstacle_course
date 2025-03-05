const Player = () => {
  return (
    <mesh>
      <capsuleGeometry args={[0.5, 1, 8, 16]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default Player;
