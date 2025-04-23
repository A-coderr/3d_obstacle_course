import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"; // Adjust path as needed

const ScoreDisplay: React.FC = () => {
  const score = useSelector((state: RootState) => state.game.score);

  return (
    <div className="absolute top-5 left-5 bg-black/70 text-white text-xl font-bold px-5 py-2 rounded-lg z-10 border-3 border-[#00a2ff] shadow-[0_0_15px_#00a2ff] select-none">
      💎 Score {score}
    </div>
  );
};

export default ScoreDisplay;
