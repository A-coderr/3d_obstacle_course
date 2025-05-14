import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="absolute flex flex-col items-center justify-center h-screen w-full bg-[#000025]">
      <BeatLoader color="#ad46ff" speedMultiplier={0.5} size={60} />
      <h2 className="mt-10 text-4xl text-purple-500">Loading</h2>
    </div>
  );
};

export default Loader;
