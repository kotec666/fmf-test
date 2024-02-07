import { create } from "zustand";
import { History } from "../types/history"
import { BoardItem } from "../types/board"

interface HistoryState {
  history: History[];
  setHistory: (data: History[]) => void;
  addHistoryEvent: (history: History) => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [] as History[],
  addHistoryEvent: (history) =>
    set((state) => ({
      history: [...state.history, { id: state.history.length + 1, ...history} ],
    })),
  setHistory: (data: History[]) =>
    set((state) => ({
      history: data,
    })),
}))
