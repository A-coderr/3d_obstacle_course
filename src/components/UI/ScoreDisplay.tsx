import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"; // Adjust path as needed

const ScoreDisplay: React.FC = () => {
  const score = useSelector((state: RootState) => state.game.score);

  return (
    <div className="absolute z-10 top-5 left-5 text-2xl font-bold text-pink-500 bg-black/50 px-4 py-2 rounded-xl">
      Score: {score}
    </div>
  );
};

export default ScoreDisplay;
