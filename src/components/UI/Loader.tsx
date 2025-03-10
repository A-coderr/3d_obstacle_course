import { useProgress, Html } from "@react-three/drei";
import { BeatLoader } from "react-spinners";
/**
 * Loader component serves as a loading indicator using
 * React Spinners and R3F's useProgress hook to display the loading progress.
 */
const Loader = () => {
  const { progress } = useProgress();

  return (
    // Html is used to render DOM elements inside the 3D canvas to avoid R3F errors.
    <Html center style={{ width: "100vw", height: "100vh" }}>
      <div className="flex flex-col items-center justify-center h-screen w-full bg-[#19153b]">
        <BeatLoader color="#fa4853" speedMultiplier={0.5} size={60} />
        <h2 className="mt-10 text-4xl text-[#fa4853]">
          {progress.toFixed(0)}%
        </h2>
      </div>
    </Html>
  );
};

export default Loader;
