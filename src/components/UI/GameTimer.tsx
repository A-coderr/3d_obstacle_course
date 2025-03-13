import { useState, useEffect } from "react";

type GameTimerProps = {
  isGameStarted: boolean;
};

/**
 * A React component that displays a dynamic timer based on the game state.
 *
 * When isGameStarted is true, the timer increments every second and displays
 * the elapsed time in the format `HH:MM:SS` if 1 hour has passed or `MM:SS` if
 * less than an hour has passed.
 *
 * When isGameStarted is false, the timer resets to 0 and stops.
 */
const GameTimer: React.FC<GameTimerProps> = ({ isGameStarted }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: number | null = null;

    if (isGameStarted) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setTime(0); //Resets timer when game restarts
    }

    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [isGameStarted]);

  //Calculates hours, minutes, and seconds
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  //Formats time dynamically: HH:MM:SS if 1 hour has passed, otherwise MM:SS
  const formattedTime =
    hours > 0
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`;

  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xl font-bold px-5 py-2 rounded-lg z-10 border-2 border-amber-500">
      ⏱ Time {formattedTime}
    </div>
  );
};

export default GameTimer;
