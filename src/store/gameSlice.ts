import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  isLoading: boolean;
  isGameStarted: boolean;
  isGameFinished: boolean;
  isGamePaused: boolean;
  time: number;
  collected: string[];
  score: number;
}

const initialState: GameState = {
  isLoading: true,
  isGameStarted: false,
  isGameFinished: false,
  isGamePaused: false,
  time: 0,
  collected: [],
  score: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setLoadingComplete: (state) => {
      state.isLoading = false;
    },
    startGame: (state) => {
      state.isGameStarted = true;
      state.isGameFinished = false;
      state.isGamePaused = false;
    },
    endGame: (state) => {
      state.isGameStarted = false;
      state.isGameFinished = true;
      state.isGamePaused = false;
    },
    startTimer(state) {
      state.time = 0; // Reset time when the game starts
    },
    incrementTime(state) {
      state.time += 1; // Increment time by 1 second
    },
    resetTimer(state) {
      state.time = 0; // Reset time when game ends
    },
    pauseGame(state) {
      state.isGamePaused = !state.isGamePaused; // Toggle pause state
    },
    collectItem: (state, action: PayloadAction<string>) => {
      if (!state.collected.includes(action.payload)) {
        state.collected.push(action.payload);
        state.score += 100;
      }
    },
    resetCollectibles: (state) => {
      state.collected = [];
    },
    resetScore: (state) => {
      state.score = 0;
    },
  },
});

export const {
  setLoadingComplete,
  startGame,
  endGame,
  startTimer,
  incrementTime,
  resetTimer,
  pauseGame,
  collectItem,
  resetCollectibles,
  resetScore,
} = gameSlice.actions;
export default gameSlice.reducer;
