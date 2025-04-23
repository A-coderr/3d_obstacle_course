import { useDispatch } from "react-redux";
import { pauseGame } from "../../store/gameSlice";

const PauseButton = () => {
  const dispatch = useDispatch();

  const togglePause = () => {
    dispatch(pauseGame());
  };

  return (
    <button
      onClick={togglePause}
      className="absolute z-10 top-5 right-5 px-5 py-3 text-[#00a2ff] font-bold text-2xl border-4 border-[#00a2ff] 
                 rounded-full bg-black shadow-[0_0_15px_#00a2ff] transition-all duration-300 
                 hover:shadow-[0_0_25px_#00a2ff] hover:scale-110 active:scale-100 select-none"
    >
      II
    </button>
  );
};

export default PauseButton;
