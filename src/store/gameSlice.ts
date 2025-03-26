import { createSlice } from "@reduxjs/toolkit";

export interface GameState {
  isLoading: boolean;
  isGameStarted: boolean;
  isGameFinished: boolean;
  isGamePaused: boolean;
  time: number;
}

const initialState: GameState = {
  isLoading: true,
  isGameStarted: false,
  isGameFinished: false,
  isGamePaused: false,
  time: 0,
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
      state.isGamePaused = true;
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
} = gameSlice.actions;
export default gameSlice.reducer;
