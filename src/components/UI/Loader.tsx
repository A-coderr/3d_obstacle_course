import { useProgress, Html } from "@react-three/drei";
import { BeatLoader } from "react-spinners";
import { setLoadingComplete } from "../../store/gameSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
/**
 * Loader component serves as a loading indicator using
 * React Spinners and R3F's useProgress hook to display the loading progress.
 */
const Loader = () => {
  const { progress } = useProgress();
  const dispatch = useDispatch();

  useEffect(() => {
    if (progress === 100) {
      dispatch(setLoadingComplete());
    }
  }, [progress, dispatch]);

  return (
    // Html is used to render DOM elements inside the 3D canvas to avoid R3F errors.
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
