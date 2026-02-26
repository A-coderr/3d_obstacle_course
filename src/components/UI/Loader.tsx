import { useProgress, Html } from "@react-three/drei";
import { BeatLoader } from "react-spinners";
import { setPhase } from "../../store/gameSlice";
import { useEffect, useState } from "react";

const Loader = () => {
  const { progress } = useProgress();
  const [hasTriggeredMainMenu, setHasTriggeredMainMenu] = useState(false);

  useEffect(() => {
    if (progress === 100 && !hasTriggeredMainMenu) {
      console.log("Progress is complete");
      setHasTriggeredMainMenu(true);
      setPhase("MAIN_MENU");
      console.log("Dispatched MAIN_MENU phase");
    }
  }, [progress, hasTriggeredMainMenu]);

  return (
    <Html center style={{ width: "100vw", height: "100vh" }}>
      <div className="flex flex-col items-center justify-center h-screen w-full bg-[#000025]">
        <BeatLoader color="#ad46ff" speedMultiplier={0.5} size={60} />
        <h2 className="mt-10 text-4xl text-purple-500">
          {progress.toFixed(0)}%
        </h2>
      </div>
    </Html>
  );
};

export default Loader;
