import { useDispatch, useSelector } from "react-redux";
import { setPhase, resetGame } from "../../store/gameSlice";
import { RootState } from "../../store/store";

const EndGameScreen = () => {
  const dispatch = useDispatch();

  const time = useSelector((state: RootState) => state.game.time);
  const score = useSelector((state: RootState) => state.game.score);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const handleRestart = () => {
    dispatch(resetGame());
    dispatch(setPhase("PLAYING"));
  };

  const handleGoToMainMenu = () => {
    dispatch(setPhase("MAIN_MENU"));
    console.log("Navigating to main menu...");
  };

  const handleQuit = () => {
    window.close();
  };

  return (
    <div
      className="absolute inset-0 flex flex-col lg:flex-row gap-8 lg:gap-20 items-center justify-center z-50 bg-gradient-to-br from-[#1b1b2f] via-[#1f2a48] to-[#191b2e]"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="bg-[#101020] text-white py-10 px-6 border-2 border-rose-500 rounded-lg shadow-[0_0_15px_#f43f5e] flex flex-col items-center max-w-2xl w-full select-none">
        <h1 className="text-2xl custom-title xl:text-5xl lg:text-4xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-purple-400">
          Game Over
        </h1>
        <p className="text-xl mt-6">⏱️ Time: {formattedTime}</p>
        <p className="text-xl">💎 Score: {score}</p>
        <div className="flex flex-col items-center gap-5 mt-6 w-full">
          <button
            className="mt-4 px-10 py-4 text-white font-bold uppercase text-lg lg:text-2xl bg-black border-2 border-rose-500 rounded-lg shadow-[0_0_15px_#f43f5e] hover:shadow-[0_0_25px_#f43f5e] hover:scale-110 active:scale-100 transition duration-300"
            onClick={handleRestart}
          >
            Restart
          </button>
          <button
            className="mt-4 px-10 py-4 text-white font-bold uppercase text-lg lg:text-2xl bg-black border-2 border-pink-500 rounded-lg shadow-[0_0_15px_#ec4899] hover:shadow-[0_0_25px_#ec4899] hover:scale-110 active:scale-100 transition duration-300"
            onClick={handleGoToMainMenu}
          >
            Main Menu
          </button>
          <button
            className="mt-4 px-10 py-4 text-white font-bold uppercase text-lg lg:text-2xl bg-black border-2 border-purple-500 rounded-lg shadow-[0_0_15px_#c084fc] hover:shadow-[0_0_25px_#c084fc] hover:scale-110 active:scale-100 transition duration-300"
            onClick={handleQuit}
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndGameScreen;
