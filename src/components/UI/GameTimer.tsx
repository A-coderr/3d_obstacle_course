import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { incrementTime } from "../../store/gameSlice";
/**
 * A React component that displays a dynamic timer based on the game state.
 *
 * When isGameStarted is true, the timer increments every second and displays
 * the elapsed time in the format `HH:MM:SS` if 1 hour has passed or `MM:SS` if
 * less than an hour has passed.
 *
 * When isGameStarted is false, the timer resets to 0 and stops.
 */
const GameTimer = () => {
  const dispatch = useDispatch();
  const time = useSelector((state: RootState) => state.game.time);
  const isGameStarted = useSelector(
    (state: RootState) => state.game.isGameStarted
  );
  const isGameFinished = useSelector(
    (state: RootState) => state.game.isGameFinished
  );

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isGameStarted && !isGameFinished) {
      // Start timer when game starts
      interval = setInterval(() => {
        dispatch(incrementTime()); // Increment time every second
      }, 1000);
    } else if (interval) {
      clearInterval(interval); // Clear interval when game ends or pauses
    }

    return () => {
      if (interval) clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [isGameStarted, isGameFinished, dispatch]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xl font-bold px-5 py-2 rounded-lg z-10 border-3 border-[#ad46ff]">
      ⏱ Time {formattedTime}
    </div>
  );
};

export default GameTimer;
