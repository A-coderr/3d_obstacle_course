import { useDispatch } from "react-redux";
import { startGame } from "../../store/gameSlice";

const EndGameScreen = () => {
  const dispatch = useDispatch();

  const handleRestart = () => {
    dispatch(startGame());
  };

  const handleGoToMainMenu = () => {
    // Navigate to the main menu (you can adjust this based on your routing)
    console.log("Navigating to main menu...");
  };

  const handleQuit = () => {
    // Quit the game (or navigate away from the game)
    console.log("Quitting the game...");
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-gradient-to-t from-[#3d006e] via-[#231e52] to-[#19153b]">
      <div className="bg-[#000025] text-white py-10 px-4 border-2 border-pink-500 rounded-lg shadow-[0_0_15px_#ff00ff] flex flex-col items-center max-w-2xl w-full select-none">
        <h1 className="text-2xl xl:text-5xl lg:text-4xl md:text-3xl custom-title font-bold text-center max-w-full">
          Game Over
        </h1>
        <div className="flex flex-col items-center gap-5 mt-8 w-full">
          <button
            className="mt-4 px-10 py-4 text-white font-bold uppercase text-lg lg:text-2xl bg-black border-2 border-purple-500 rounded-lg shadow-[0_0_15px_#a855f7] hover:shadow-[0_0_25px_#a855f7] transition duration-100"
            onClick={handleRestart}
          >
            Restart
          </button>
          <button
            className="mt-4 px-10 py-4 text-white font-bold uppercase text-lg lg:text-2xl bg-black border-2 border-purple-500 rounded-lg shadow-[0_0_15px_#a855f7] hover:shadow-[0_0_25px_#a855f7] transition duration-100"
            onClick={handleGoToMainMenu}
          >
            Main Menu
          </button>
          <button
            className="mt-4 px-10 py-4 text-white font-bold uppercase text-lg lg:text-2xl bg-black border-2 border-purple-500 rounded-lg shadow-[0_0_15px_#a855f7] hover:shadow-[0_0_25px_#a855f7] transition duration-100"
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
