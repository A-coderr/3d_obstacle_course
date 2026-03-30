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
  const phase = useSelector((state: RootState) => state.game.phase);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (phase === "PLAYING") {
      //Starts timer when game starts.
      interval = setInterval(() => {
        dispatch(incrementTime()); //Increments time every second.
      }, 1000);
    } else if (interval) {
      clearInterval(interval); //Clears interval when game ends or pauses.
    }

    return () => {
      if (interval) clearInterval(interval); //Cleans up the interval when the component unmounts.
    };
  }, [phase, dispatch]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div className="absolute left-1/2 top-5 z-10 min-w-32 -translate-x-1/2 rounded-xl border border-fuchsia-400/80 bg-black/70 px-4 py-2 text-center text-white shadow-[0_0_16px_#d946ef40] backdrop-blur-sm select-none">
      <p className="text-[9px] uppercase tracking-[0.24em] text-fuchsia-300/90">
        Time
      </p>
      <p className="mt-1 text-xl font-bold tabular-nums">{formattedTime}</p>
    </div>
  );
};

export default GameTimer;
