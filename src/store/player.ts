import { create } from "zustand";
import { Player } from "../types/player"
import player from "../components/ui/Player"

interface PlayerState {
  players: Player[];
  setPlayers: (data: Player[]) => void;
  addPlayer: (data: { id: number; balance: number; }) => void;
  updatePlayer: (data: Partial<Player>) => void;
  endGameForPlayer: (playerId: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  players: [] as Player[],
  addPlayer: (data: { id: number; balance: number; position: number; }) =>
    set((state) => ({
      players: [...state.players, { id: data.id, name: `Игрок ${data.id}`, balance: data.balance, status: false, position: data.position }],
    })),
  updatePlayer: (data: Partial<Player>) =>
    set((state) => ({
      players: state.players.map(player => player.id === data.id ? { ...player, ...data } : player),
    })),
  endGameForPlayer: (playerId) =>
    set((state) => ({
      players: state.players.map(p => p.id === playerId ? { ...p, status: true } : p),
    })),
  setPlayers: (data: Player[]) =>
    set(() => ({
      players: data
    })),
}))
