import './App.css'
import Button from "./components/ui/Button";
import { useEffect, useRef, useState } from "react"
import Game from "./Game"
import { useGameStore } from "./store/game"
import { useBoardStore } from "./store/board"
import { useHistoryStore } from "./store/history"
import { usePlayerStore } from "./store/player"
import { Game as IGame } from "./types/game"
import { BoardItem as IBoardItem } from "./types/board"
import { Player } from "./types/player"
import { History } from "./types/history"

interface IGameState {
  game: IGame
  boardItems: IBoardItem[]
  history: History[]
  players: Player[]
}
function App() {
  const [data, setData] = useState({
    isLsExist: false,
    isGameStarted: false,
    isContinue: false,
    parsedLs: {} as IGameState
  })
  const isFirstRender = useRef(false)

  const game = useGameStore((state) => state.game)
  const boardItems = useBoardStore((state) => state.boardItems)
  const history = useHistoryStore((state) => state.history)
  const players = usePlayerStore((state) => state.players)

  const setGame = useGameStore((state) => state.setGame)
  const setBoardItems = useBoardStore((state) => state.setBoardItems)
  const setHistory = useHistoryStore((state) => state.setHistory)
  const setPlayers = usePlayerStore((state) => state.setPlayers)

  useEffect(() => {
    const ls = localStorage.getItem("gameData")
    if (ls) {
      setData(s => ({...s, isLsExist: true}))
    } else {
      setData(s => ({...s, isLsExist: false}))
    }

    const parsedLs = JSON.parse(ls)

    setData(s => ({...s, parsedLs: parsedLs}))

    if (!isFirstRender.current) {
      isFirstRender.current = true
      return
    }

      localStorage.setItem("gameData", JSON.stringify({
        game: game,
        boardItems: boardItems,
        history: history,
        players: players,
      }))
  }, [game, boardItems, history, players])

  const handleStartGame = (isContinue: boolean) => {
    setData(s => ({...s, isGameStarted: true, isContinue: isContinue}))

    if (isContinue) {
      setGame(data.parsedLs.game)
      setBoardItems(data.parsedLs.boardItems)
      setHistory(data.parsedLs.history)
      setPlayers(data.parsedLs.players)
    }
  }


  return (
       <>
         {data.isGameStarted ? (<Game />) : (<div className="h-[100vh] h-[100svh] flex items-center justify-center flex-col gap-y-[30px]">
           <div className="cursor-pointer" onClick={() => handleStartGame(false)}>
             <span className="font-normal text-sm">Новая игра</span>
           </div>
           {data.isLsExist && (
             <Button onClick={() => handleStartGame(true)}>
               Продолжить игру
             </Button>
           )}
         </div>)}
       </>
    )
}

export default App
