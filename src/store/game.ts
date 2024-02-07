import { create } from "zustand";
import { Game } from "../types/game"

interface GameState {
  game: Game;
  updateGame: (data: Partial<Game>) => void;
  setGame: (data: Game) => void;
}

export const useGameStore = create<GameState>((set) => ({
  game: {} as Game,
  setGame: (data: Game) =>
    set((state) => ({
      game: data,
    })),
  updateGame: (data: Partial<Game>) =>
    set((state) => ({
      game: { ...state.game, ...data },
    })),
}))
