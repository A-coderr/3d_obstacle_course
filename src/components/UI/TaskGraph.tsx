import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { LEVEL_1_CRYSTAL_IDS } from "../../store/gameSlice";
import { RootState } from "../../store/store";

type VisibleTaskState = "entering" | "active" | "completed" | "exiting";

interface VisibleTask {
  id: string;
  label: string;
  state: VisibleTaskState;
}

const ENTER_ANIMATION_MS = 220;
const COMPLETE_DISPLAY_MS = 320;
const EXIT_ANIMATION_MS = 220;
const TASK_DISPLAY_ORDER = [
  "move-forward",
  "turn-left",
  "turn-right",
  "collect-crystals",
  "reach-finish",
];

const getTaskDisplayLabel = (
  taskId: string,
  baseLabel: string,
  collectedCrystalCount: number
) =>
  taskId === "collect-crystals"
    ? `${baseLabel} (${collectedCrystalCount}/${LEVEL_1_CRYSTAL_IDS.length})`
    : baseLabel;

const TaskGraph = () => {
  const tasks = useSelector((state: RootState) => state.game.levelTasks);
  const collected = useSelector((state: RootState) => state.game.collected);
  const resetCount = useSelector((state: RootState) => state.game.resetCount);
  const movementTaskIds = ["move-forward", "turn-left", "turn-right"];
  const currentMovementTask = movementTaskIds
    .map((taskId) => tasks.find((task) => task.id === taskId))
    .find((task) => task && !task.completed);
  const crystalTask = tasks.find((task) => task.id === "collect-crystals");
  const finishTask = tasks.find((task) => task.id === "reach-finish");
  const areMovementTasksComplete = movementTaskIds.every((taskId) =>
    tasks.some((task) => task.id === taskId && task.completed)
  );
  const isCrystalTaskComplete = Boolean(crystalTask?.completed);
  const activeTasks = [
    ...(currentMovementTask ? [currentMovementTask] : []),
    ...(crystalTask && !crystalTask.completed ? [crystalTask] : []),
    ...(finishTask &&
    !finishTask.completed &&
    areMovementTasksComplete &&
    isCrystalTaskComplete
      ? [finishTask]
      : []),
  ];
  const completedCount = tasks.filter((task) => task.completed).length;
  const collectedCrystalCount = LEVEL_1_CRYSTAL_IDS.filter((crystalId) =>
    collected.includes(crystalId)
  ).length;
  const activeTaskIds = useMemo(
    () => new Set(activeTasks.map((task) => task.id)),
    [activeTasks]
  );
  const completedTaskIds = useMemo(
    () => new Set(tasks.filter((task) => task.completed).map((task) => task.id)),
    [tasks]
  );
  const [visibleTasks, setVisibleTasks] = useState<VisibleTask[]>(() =>
      activeTasks.map((task) => ({
        id: task.id,
        label: getTaskDisplayLabel(task.id, task.label, collectedCrystalCount),
        state: "active",
      }))
  );
  const enterTimersRef = useRef<Record<string, number>>({});
  const completedTimersRef = useRef<Record<string, number>>({});
  const exitTimersRef = useRef<Record<string, number>>({});

  useEffect(() => {
    return () => {
      Object.values(enterTimersRef.current).forEach((timerId) =>
        window.clearTimeout(timerId)
      );
      Object.values(completedTimersRef.current).forEach((timerId) =>
        window.clearTimeout(timerId)
      );
      Object.values(exitTimersRef.current).forEach((timerId) =>
        window.clearTimeout(timerId)
      );
    };
  }, []);

  useEffect(() => {
    setVisibleTasks(
      activeTasks.map((task) => ({
        id: task.id,
        label: getTaskDisplayLabel(task.id, task.label, collectedCrystalCount),
        state: "active",
      }))
    );

    Object.values(enterTimersRef.current).forEach((timerId) =>
      window.clearTimeout(timerId)
    );
    Object.values(completedTimersRef.current).forEach((timerId) =>
      window.clearTimeout(timerId)
    );
    Object.values(exitTimersRef.current).forEach((timerId) =>
      window.clearTimeout(timerId)
    );
    enterTimersRef.current = {};
    completedTimersRef.current = {};
    exitTimersRef.current = {};
  }, [resetCount]);

  useEffect(() => {
    setVisibleTasks((previousTasks) => {
      let changed = false;
      const nextTasks = previousTasks.map((task) => ({ ...task }));

      nextTasks.forEach((task) => {
        const matchingTask = tasks.find((candidateTask) => candidateTask.id === task.id);
        const isActive = activeTaskIds.has(task.id);
        const isCompleted = completedTaskIds.has(task.id);

        if (matchingTask) {
          const nextLabel = getTaskDisplayLabel(
            matchingTask.id,
            matchingTask.label,
            collectedCrystalCount
          );

          if (task.label !== nextLabel) {
            task.label = nextLabel;
            changed = true;
          }
        }

        if (
          !isActive &&
          isCompleted &&
          task.state !== "completed" &&
          task.state !== "exiting"
        ) {
          task.state = "completed";
          changed = true;

          if (!completedTimersRef.current[task.id]) {
            completedTimersRef.current[task.id] = window.setTimeout(() => {
              setVisibleTasks((currentTasks) =>
                currentTasks.map((currentTask) =>
                  currentTask.id === task.id && currentTask.state === "completed"
                    ? { ...currentTask, state: "exiting" }
                    : currentTask
                )
              );

              delete completedTimersRef.current[task.id];

              exitTimersRef.current[task.id] = window.setTimeout(() => {
                setVisibleTasks((currentTasks) =>
                  currentTasks.filter((currentTask) => currentTask.id !== task.id)
                );
                delete exitTimersRef.current[task.id];
              }, EXIT_ANIMATION_MS);
            }, COMPLETE_DISPLAY_MS);
          }
        }
      });

      const filteredTasks = nextTasks.filter((task) => {
        const isActive = activeTaskIds.has(task.id);
        const isCompleted = completedTaskIds.has(task.id);
        const isLeaving = task.state === "completed" || task.state === "exiting";

        if (!isActive && !isCompleted && !isLeaving) {
          if (enterTimersRef.current[task.id]) {
            window.clearTimeout(enterTimersRef.current[task.id]);
            delete enterTimersRef.current[task.id];
          }
          changed = true;
          return false;
        }

        return true;
      });

      const hasTaskLeaving = filteredTasks.some(
        (task) => task.state === "completed" || task.state === "exiting"
      );

      if (!hasTaskLeaving) {
        activeTasks.forEach((task) => {
          const existingTask = filteredTasks.find((item) => item.id === task.id);

          if (existingTask) {
            if (existingTask.state === "entering" || existingTask.state === "active") {
              if (existingTask.state !== "active") {
                  existingTask.state = "active";
                changed = true;
              }
            }
            return;
          }

          changed = true;
          filteredTasks.push({
            id: task.id,
            label: getTaskDisplayLabel(task.id, task.label, collectedCrystalCount),
            state: "entering",
          });

          enterTimersRef.current[task.id] = window.setTimeout(() => {
            setVisibleTasks((currentTasks) =>
              currentTasks.map((currentTask) =>
                currentTask.id === task.id && currentTask.state === "entering"
                  ? { ...currentTask, state: "active" }
                  : currentTask
              )
            );
            delete enterTimersRef.current[task.id];
          }, ENTER_ANIMATION_MS);
        });
      }

      filteredTasks.sort(
        (leftTask, rightTask) =>
          TASK_DISPLAY_ORDER.indexOf(leftTask.id) -
          TASK_DISPLAY_ORDER.indexOf(rightTask.id)
      );

      return changed ? filteredTasks : previousTasks;
    });
  }, [activeTaskIds, activeTasks, collectedCrystalCount, completedTaskIds, tasks, visibleTasks]);

  return (
    <div className="absolute left-5 top-5 z-10 w-[min(22rem,calc(100vw-7rem))] rounded-2xl border-2 border-cyan-400 bg-black/78 px-4 py-4 text-white shadow-[0_0_20px_#22d3ee55] backdrop-blur-sm select-none">
      <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
        Level 1 Tasks
      </p>
      <p className="mt-2 text-sm text-cyan-100/90">
        Completed: {completedCount}/{tasks.length}
      </p>
      {visibleTasks.length > 0 ? (
        <div className="mt-3 space-y-2">
          {visibleTasks.map((task) => {
            const taskClassName =
              task.state === "completed"
                ? "border-emerald-400 bg-emerald-500/15 text-emerald-200 opacity-100 translate-x-0"
                : task.state === "exiting"
                  ? "border-emerald-400 bg-emerald-500/15 text-emerald-200 opacity-0 translate-x-4"
                  : task.state === "entering"
                    ? "border-cyan-300 bg-cyan-500/15 text-cyan-100 opacity-0 translate-x-4"
                    : "border-cyan-300 bg-cyan-500/15 text-cyan-100 opacity-100 translate-x-0";

            return (
              <div
                key={task.id}
                className={`rounded-lg border px-3 py-3 text-sm transition-all duration-300 ease-out ${taskClassName}`}
              >
                {task.label}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-3 rounded-lg border border-emerald-400 bg-emerald-500/15 px-3 py-3 text-sm text-emerald-200">
          All Level 1 tasks finished
        </div>
      )}
    </div>
  );
};

export default TaskGraph;
