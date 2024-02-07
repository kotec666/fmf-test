import React, {useState} from 'react';
import Button from "../ui/Button";
import TransactionModal from "./TransactionModal";
import HistoryModal from "./HistoryModal";
import { usePlayerStore } from "../../store/player"
import { useHistoryStore } from "../../store/history"
import { HistoryEvent } from "../../types/history"
import { useGetHistoryEvent } from "../../hooks/useGetHistoryEvent"
import { getRandomNumberByLimit } from "../../helpers/getRandomNumberByLimit"
import { useGameStore } from "../../store/game"
import player from "../ui/Player"
import { createUniqueId } from "../../helpers/createUniqueId"

const ActionModals = () => {
    const [data, setData] = useState({
        transactionModal: false,
        historyModal: false,
    })

  const addPlayer = usePlayerStore(state => state.addPlayer)
  const addHistoryEvent = useHistoryStore(state => state.addHistoryEvent)
  const players = usePlayerStore((state) => state.players)
  const history = useHistoryStore((state) => state.history)
  const updateGame = useGameStore((state) => state.updateGame)

  const handleClickAddPlayer = () => {
    const newPlayerData = {
      id: players.length + 1,
      name: `Игрок ${players.length + 1}`,
      balance: 15_000_000,
      position: 1,
      status: false
    };

    addPlayer(newPlayerData);

    if (newPlayerData.id === 1) {
      updateGame({ players: [...players, newPlayerData], currentPlayerQueue: newPlayerData })
    } else {
      updateGame({ players: [...players, newPlayerData] })
    }


    addHistoryEvent({
      event: HistoryEvent.add_player,
      added_player_id: newPlayerData.id,
    });
		addHistoryEvent({
			event: HistoryEvent.money_add,
			added_balance_player_id: newPlayerData.id,
      added_balance_amount: newPlayerData.balance
		});
  };

    const historyData = useGetHistoryEvent(history)

    return (
        <div>
            {data.transactionModal && (<TransactionModal isVisible={data.transactionModal} onClose={() => setData(s => ({ ...s, transactionModal: !s.transactionModal }))} />)}
            {data.historyModal && (<HistoryModal isVisible={data.historyModal} onClose={() => setData(s => ({ ...s, historyModal: !s.historyModal }))} />)}
            <div className="flex flex-col gap-y-[15px]">
                <Button onClick={handleClickAddPlayer} >Создать игрока</Button>
                <Button onClick={() => setData(s => ({ ...s, transactionModal: true }))}>Транзакция</Button>
                <Button onClick={() => setData(s => ({ ...s, historyModal: true }))}>История</Button>
            </div>
            <div className="mt-[33px] flex flex-col">
                <div>
                    <span>Последняя история:</span>
                </div>
                <div>
                  {historyData.length ? historyData.reverse().slice(0, 3).map((history, idx) => {
                    return <div key={createUniqueId()}>
                      <span>{idx + 1}) {history}</span>
                    </div>
                  }) : <div>История пуста</div>}
                </div>
            </div>
        </div>
    );
};

export default ActionModals;