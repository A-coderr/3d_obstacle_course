import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GamePhase =
  | "LOADING"
  | "MAIN_MENU"
  | "PLAYING"
  | "PAUSED"
  | "GAME_OVER"
  | "VICTORY";

export interface LevelTask {
  id: string;
  label: string;
  completed: boolean;
  prerequisites?: string[];
}

const TASK_REWARD_POINTS = 50;
export const LEVEL_1_CRYSTAL_IDS = ["gem1", "gem2"] as const;

export interface GameState {
  phase: GamePhase;
  time: number;
  collected: string[];
  score: number;
  resetCount: number;
  levelTasks: LevelTask[];
}

const createInitialLevelTasks = (): LevelTask[] => [
  {
    id: "move-forward",
    label: "Move forward with W",
    completed: false,
  },
  {
    id: "turn-left",
    label: "Turn left with A",
    completed: false,
  },
  {
    id: "turn-right",
    label: "Turn right with D",
    completed: false,
  },
  {
    id: "collect-crystals",
    label: "Pick up crystals",
    completed: false,
  },
  {
    id: "reach-finish",
    label: "Reach the finish platform",
    completed: false,
    prerequisites: [
      "move-forward",
      "turn-left",
      "turn-right",
      "collect-crystals",
    ],
  },
];

const initialState: GameState = {
  phase: "LOADING",
  time: 0,
  collected: [],
  score: 0,
  resetCount: 0,
  levelTasks: createInitialLevelTasks(),
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPhase(state, action: PayloadAction<GamePhase>) {
      state.phase = action.payload;
    },
    startGame(state) {
      state.phase = "PLAYING";
      state.time = 0;
      state.collected = [];
      state.score = 0;
      state.levelTasks = createInitialLevelTasks();
    },
    pauseGame(state) {
      if (state.phase === "PLAYING") {
        state.phase = "PAUSED";
      } else if (state.phase === "PAUSED") {
        state.phase = "PLAYING";
      }
    },
    endGame(state, action: PayloadAction<"win" | "lose">) {
      state.phase = action.payload === "win" ? "VICTORY" : "GAME_OVER";
    },
    incrementTime(state) {
      if (state.phase === "PLAYING") {
        state.time += 1;
      }
    },
    collectItem(state, action: PayloadAction<string>) {
      if (!state.collected.includes(action.payload)) {
        state.collected.push(action.payload);
        state.score += 100;

        const collectedAllCrystals = LEVEL_1_CRYSTAL_IDS.every((crystalId) =>
          state.collected.includes(crystalId)
        );

        if (collectedAllCrystals) {
          const crystalTask = state.levelTasks.find(
            (task) => task.id === "collect-crystals"
          );

          if (crystalTask && !crystalTask.completed) {
            crystalTask.completed = true;
            state.score += TASK_REWARD_POINTS;
          }
        }
      }
    },
    resetGame(state) {
      state.time = 0;
      state.collected = [];
      state.score = 0;
      state.resetCount += 1;
      state.levelTasks = createInitialLevelTasks();
    },
    completeTask(state, action: PayloadAction<string>) {
      const nextTask = state.levelTasks.find(
        (task) => task.id === action.payload && !task.completed
      );

      if (nextTask) {
        nextTask.completed = true;
        state.score += TASK_REWARD_POINTS;
      }
    },
  },
});

export const {
  setPhase,
  startGame,
  pauseGame,
  endGame,
  incrementTime,
  collectItem,
  resetGame,
  completeTask,
} = gameSlice.actions;
export default gameSlice.reducer;
