import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ScoreDisplay: React.FC = () => {
  const score = useSelector((state: RootState) => state.game.score);

  return (
    <div className="absolute right-5 top-5 z-10 min-w-36 rounded-xl border border-sky-400/80 bg-black/70 px-4 py-2 text-right text-white shadow-[0_0_16px_#38bdf840] backdrop-blur-sm select-none">
      <p className="text-[9px] uppercase tracking-[0.24em] text-sky-300/90">
        Score
      </p>
      <p className="mt-1 text-xl font-bold tabular-nums">{score}</p>
    </div>
  );
};

export default ScoreDisplay;
