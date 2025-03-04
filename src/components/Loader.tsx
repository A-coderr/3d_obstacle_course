import { useProgress, Html } from "@react-three/drei";
import { PulseLoader } from "react-spinners";
/**
 * Loader component serves as a loading indicator using
 * React Spinners and R3F's useProgress hook to display the loading progress.
 */
const Loader = () => {
  const { progress } = useProgress();

  return (
    // Html is used to render DOM elements inside the 3D canvas to avoid R3F errors.
    <Html center style={{ width: "100vw", height: "100vh" }}>
      <div className="flex flex-col items-center justify-center h-screen w-full bg-[#221f20]">
        <PulseLoader color="#E7A644" size={100} speedMultiplier={0.5} />
        <h2 className="mt-5 text-5xl text-[#E7A644]">{progress.toFixed(0)}%</h2>
      </div>
    </Html>
  );
};

export default Loader;
