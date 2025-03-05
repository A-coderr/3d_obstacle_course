import { useState } from "react";
const StartScreen = () => {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  return (
    <>
      {showWelcome && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-[#221f20] text-white py-10 px-10 rounded-2xl shadow-lg flex items-center flex-col max-w-5xl w-full select-none">
            <h1 className="text-5xl font-bold">Supply Chain</h1>
            <p className="my-15 text-4xl px-7">
              Welcome to the Warehouse. The workers have all gone home after a
              long day, and you have a rare opportunity to explore the layout
              and note areas for improvement.
            </p>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-4 rounded text-4xl font-bold"
              onClick={() => setShowWelcome(false)}
            >
              Begin
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StartScreen;
