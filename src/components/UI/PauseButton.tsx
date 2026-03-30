import { useDispatch, useSelector } from "react-redux";
import { pauseGame } from "../../store/gameSlice";
import { RootState } from "../../store/store";

const PauseButton = () => {
  const dispatch = useDispatch();

  const phase = useSelector((state: RootState) => state.game.phase);

  const togglePause = () => {
    if (phase === "PLAYING" || phase === "PAUSED") {
      dispatch(pauseGame());
    }
  };

  return (
    <button
      onClick={togglePause}
      className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/70 bg-black/80 text-xl font-bold text-white shadow-[0_0_18px_rgba(255,255,255,0.2)] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:shadow-[0_0_24px_rgba(255,255,255,0.3)] active:scale-100 select-none"
      tabIndex={-1}
      aria-label="Pause game"
    >
      II
    </button>
  );
};

export default PauseButton;
