import { useState } from "react";
import { useDispatch } from "react-redux";
import { startGame } from "../../store/gameSlice";

const StartScreen = () => {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [showLogo, setShowLogo] = useState(true);
  const dispatch = useDispatch();

  return (
    <>
      {showWelcome && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-t from-[#3d006e] via-[#231e52] to-[#19153b] px-4 py-8">
          <div className="relative w-full max-w-3xl rounded-2xl border-2 border-pink-500/80 bg-[#000025]/95 px-6 py-8 text-white shadow-[0_0_40px_#ff00ff66] backdrop-blur-md md:px-10 md:py-10 select-none">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-pink-500/40 blur-3xl" />

            <div className="flex flex-col items-center gap-4 text-center">
              {showLogo && (
                <img
                  src="/logo.png"
                  alt="ThreeRun logo"
                  className="max-h-48 w-full max-w-md object-contain"
                  onError={() => setShowLogo(false)}
                />
              )}
              {!showLogo && (
                <h1 className="text-4xl md:text-5xl custom-title font-bold">ThreeRun</h1>
              )}
              <p className="text-sm md:text-base text-pink-100/90">
                Dodge obstacles, collect points, and finish as fast as possible.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-pink-500/60 bg-[#0a0138] p-4 text-center">
                <h2 className="text-sm uppercase tracking-widest text-pink-300">Move</h2>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <kbd className="rounded-md border-2 border-pink-500 bg-pink-200 px-3 py-1 font-mono font-bold text-gray-800">A</kbd>
                  <kbd className="rounded-md border-2 border-pink-500 bg-pink-200 px-3 py-1 font-mono font-bold text-gray-800">W</kbd>
                  <kbd className="rounded-md border-2 border-pink-500 bg-pink-200 px-3 py-1 font-mono font-bold text-gray-800">D</kbd>
                </div>
              </div>
              <div className="rounded-xl border border-pink-500/60 bg-[#0a0138] p-4 text-center">
                <h2 className="text-sm uppercase tracking-widest text-pink-300">Run</h2>
                <div className="mt-3 flex items-center justify-center">
                  <kbd className="rounded-md border-2 border-pink-500 bg-pink-200 px-4 py-1 font-mono font-bold text-gray-800">Shift</kbd>
                </div>
              </div>
              <div className="rounded-xl border border-pink-500/60 bg-[#0a0138] p-4 text-center">
                <h2 className="text-sm uppercase tracking-widest text-pink-300">Jump</h2>
                <div className="mt-3 flex items-center justify-center">
                  <kbd className="rounded-md border-2 border-pink-500 bg-pink-200 px-5 py-1 font-mono font-bold text-gray-800">Space</kbd>
                </div>
              </div>
            </div>

            <button
              className="mx-auto mt-8 block rounded-lg border-2 border-purple-500 bg-black px-10 py-4 text-lg font-bold uppercase text-white shadow-[0_0_20px_#a855f7] transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_#a855f7] active:scale-100"
              onClick={() => {
                dispatch(startGame());
                setShowWelcome(false);
              }}
            >
              Start Run
            </button>

            <p className="mt-6 text-center text-sm text-yellow-500">
                Note: The game is not optimized for mobile use.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default StartScreen;
