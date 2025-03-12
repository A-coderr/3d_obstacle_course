import { useState } from "react";
import { useDispatch } from "react-redux";
import { startGame } from "../../store/gameSlice";
const StartScreen = () => {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const dispatch = useDispatch();
  return (
    <>
      {showWelcome && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-gradient-to-t from-[#3d006e] via-[#231e52] to-[#19153b] text-white py-10 px-10 border-4 border-[#fa4853] rounded-2xl shadow-lg flex items-center flex-col max-w-5xl w-full select-none">
            <h1 className="text-5xl font-bold">ThreeRun</h1>
            <h3 className="mt-15 text-4xl px-7">
              Get to the end and be the first to win!
            </h3>
            <h3 className="text-4xl mt-5 mb-10">WASD to move, Shift to run</h3>

            <button
              className="bg-[#fa4853] hover:bg-[rgba(250,72,84,0.84)] text-white px-10 py-4 rounded text-4xl font-bold"
              onClick={() => dispatch(startGame()) && setShowWelcome(false)}
            >
              Begin
            </button>
            <p className="mt-5">
              The model and animations are from -{" "}
              <a
                href="https://www.mixamo.com"
                target="_blank"
                rel="nofollow noreferrer"
              >
                Mixamo
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default StartScreen;
