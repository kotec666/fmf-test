import { create } from "zustand";
import { BoardItem } from "../types/board"
import { Game } from "../types/game"

const defaultState = [
  {id: 1, money: -10_000_000_000,},
  {id: 2, money: 10_000_000,},
  {id: 3, money: -10_000_000_000, },
  {id: 4, money: 10_000_000, },
  {id: 5, money: -10_000_000_000, },
  {id: 6, money: 10_000_000, },
  {id: 7, isEmpty: true},
  {id: 8, isEmpty: true},
  {id: 9, isEmpty: true},
  {id: 10, money: 10_000_000, },
  {id: 11, money: -10_000_000_000, },
  {id: 12, money: 10_000_000, },
  {id: 13, money: -10_000_000_000, },
  {id: 14, money: 10_000_000, },
  {id: 15, money: -15_000_000_000, },
]
interface BoardState {
  boardItems: BoardItem[];
  setBoardItems: (data: BoardItem[]) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  boardItems: defaultState as BoardItem[],
  setBoardItems: (data: BoardItem[]) =>
    set((state) => ({
      boardItems: data,
    })),
}))
