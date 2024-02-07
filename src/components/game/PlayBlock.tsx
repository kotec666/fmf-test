import React from 'react';
import Button from "../ui/Button";
import GameField from "./GameField"
import { usePlayerStore } from "../../store/player"
import { useGameStore } from "../../store/game"
import { getRandomNumberByLimit } from "../../helpers/getRandomNumberByLimit"
import { useBoardStore } from "../../store/board"
import { HistoryEvent } from "../../types/history"
import { useHistoryStore } from "../../store/history"
import { getPlayerNicknameById } from "../../helpers/getPlayerNicknameById"


const PlayBlock = () => {
  const players = usePlayerStore((state) => state.players)
  const game = useGameStore((state) => state.game)
  const boardItems = useBoardStore((state) => state.boardItems)
  const updateGame = useGameStore((state) => state.updateGame)
  const updatePlayer = usePlayerStore((state) => state.updatePlayer)
  const addHistoryEvent = useHistoryStore(state => state.addHistoryEvent)



  const getRandomNumber = () => {
    return Math.floor(Math.random() * (5000000 - (-100000) + 1)) + (-100000);
  }

  const handleClickMove = () => {
    const nextPlayer = game.players.filter((nextPlayer) => {
      return nextPlayer.id === game.currentPlayerQueue.id + 1 && !nextPlayer.status
    })[0]

    const cubicResult = getRandomNumberByLimit(6)

    const availableBoardItems = boardItems.filter((boardItem) => {
      return !boardItem.isEmpty
    })

    const notAvailableBoardItems = boardItems
      .filter((boardItem) => boardItem.isEmpty)
      .map((boardItem) => boardItem.id);


    let newPlayerPos = game.currentPlayerQueue.position + cubicResult

    while (notAvailableBoardItems.includes(newPlayerPos)) {
      newPlayerPos++; // newPlayerPos + cubicResult - 1
    }

    if (newPlayerPos > availableBoardItems[availableBoardItems.length - 1]?.id) {
      newPlayerPos = newPlayerPos - availableBoardItems[availableBoardItems.length - 1]?.id; // Возврат в начало поля
    }

    const action = availableBoardItems.filter((availableBoardItem) => {
      return availableBoardItem.id === newPlayerPos
    })[0]


    let newBalance = game.currentPlayerQueue.balance + action.money

    if (Math.random() < 0.1) {
      newBalance + getRandomNumber()
      alert(`Случайное событие с 10% шансом, баланс игрока: ${getPlayerNicknameById(game.currentPlayerQueue.id, players)} становится ${newBalance}`, )
    }

    let status = false

    if (newBalance <= -5_000_000) {
      newBalance = -5_000_100
      status = true
      const withoutStatus = game.players.filter((player) => {
        return player.id !== game.currentPlayerQueue.id
      })
      addHistoryEvent({
        event: HistoryEvent.remove_player,
        removed_player_id: game.currentPlayerQueue.id,
      });
      updateGame({ players:withoutStatus, currentPlayerQueue: { status: status } })
    }


    let balanceEvent;

    const sign = Math.sign(newBalance)

    switch (sign) {
      case -1: // negative
        balanceEvent = {event: HistoryEvent.money_remove, removed_balance_player_id:game.currentPlayerQueue.id, removed_balance_amount: newBalance}
        break;
      case 1: // positive
        balanceEvent = {event: HistoryEvent.money_add, added_balance_player_id:game.currentPlayerQueue.id, added_balance_amount: newBalance}
        break;
      case 0: // zero
        balanceEvent = {event: HistoryEvent.money_add, added_balance_player_id:game.currentPlayerQueue.id, added_balance_amount: newBalance}
        break;
    }

    if (nextPlayer) {
      addHistoryEvent(balanceEvent);
      updateGame({ cubicResult: cubicResult, currentPlayerQueue: {...nextPlayer, position: newPlayerPos} })
      updatePlayer({ id:game.currentPlayerQueue.id, position: newPlayerPos, status: status, balance: newBalance})
    } else {
      addHistoryEvent(balanceEvent);
      updateGame({ cubicResult: cubicResult, currentPlayerQueue: {...{...game.players[0], status: status, balance: newBalance}, position: newPlayerPos } })
      updatePlayer({ id:game.currentPlayerQueue.id, position: newPlayerPos, status: status, balance: newBalance})
    }

  }

    return (
        <div className="flex flex-col items-center">
          {players?.filter((player) => {
            return !player.status
          }).length ? (<div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <span className="mb-[12px]">Ход игрока: {game?.currentPlayerQueue?.name}</span>
              <span>{game.cubicResult && (`Результат: ${game.cubicResult}!`)}</span>
            </div>
            <div className="mt-[40px]">
              <Button onClick={handleClickMove}>ходить</Button>
            </div>
          </div>) : (<div><span>Создайте нового игрока</span></div>)}
          <div className="mt-[5rem]">
            <div className="grid-container w-full">
              {boardItems.map((field, idx) => {
                if (field.isEmpty) {
                  return <div className="none" key={idx+new Date().toString()} />
                }
                return <GameField id={idx+1} className={`${idx + 1 <= 5 && "header" } ${idx + 1 >= 11 && "footer" }`} key={field.id} money={field.money} players={[]} />
              })}
            </div>
          </div>
        </div>
    );
};

export default PlayBlock;