import { createSlice } from "@reduxjs/toolkit";

export interface GameState {
  isLoading: boolean;
  isGameStarted: boolean;
  isGameFinished: boolean;
}

const initialState: GameState = {
  isLoading: true,
  isGameStarted: false,
  isGameFinished: false,
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
    },
    endGame: (state) => {
      state.isGameStarted = false;
      state.isGameFinished = true;
    },
  },
});

export const { setLoadingComplete, startGame, endGame } = gameSlice.actions;
export default gameSlice.reducer;
