import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GamePhase =
  | "LOADING"
  | "MAIN_MENU"
  | "PLAYING"
  | "PAUSED"
  | "GAME_OVER"
  | "VICTORY";

export interface GameState {
  phase: GamePhase;
  time: number;
  collected: string[];
  score: number;
  resetCount: number;
}

const initialState: GameState = {
  phase: "LOADING",
  time: 0,
  collected: [],
  score: 0,
  resetCount: 0,
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
      }
    },
    resetGame(state) {
      state.time = 0;
      state.collected = [];
      state.score = 0;
      state.resetCount += 1;
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
} = gameSlice.actions;
export default gameSlice.reducer;
