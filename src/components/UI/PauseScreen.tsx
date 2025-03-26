import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { pauseGame, startGame, resetTimer } from "../../store/gameSlice";

const PauseMenu = () => {
  const dispatch = useDispatch();
  const buttonStyles =
    "px-8 py-4 text-xl font-bold uppercase text-white border-2 border-[#00a2ff] bg-black rounded-lg shadow-[0_0_15px_#00a2ff] transition-all duration-300 hover:shadow-[0_0_25px_#00a2ff] hover:scale-110 active:scale-100";
  const isGamePaused = useSelector(
    (state: RootState) => state.game.isGamePaused
  );

  if (!isGamePaused) return null;

  const handleResume = () => {
    dispatch(pauseGame());
  };

  const handleRestart = () => {
    dispatch(resetTimer());
    dispatch(startGame());
  };

  const handleQuit = () => {
    console.log("Quitting the game...");
  };

  return (
    <div className="absolute inset-0 bg-opacity-90 z-50 flex items-center justify-center">
      <div
        className="bg-[#000025] text-white py-10 px-6 border-2 border-blue-500 
                      rounded-lg shadow-[0_0_15px_#008aff] flex flex-col items-center 
                      max-w-2xl w-full select-none"
      >
        <h1 className="text-2xl xl:text-5xl lg:text-4xl md:text-3xl font-bold text-center">
          Game Paused
        </h1>
        <div className="flex flex-col items-center gap-7 mt-10 w-full">
          <button className={buttonStyles} onClick={handleResume}>
            Resume
          </button>
          <button className={buttonStyles} onClick={handleRestart}>
            Restart
          </button>
          <button className={buttonStyles} onClick={handleQuit}>
            Quit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PauseMenu;
