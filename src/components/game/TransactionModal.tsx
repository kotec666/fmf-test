import React, { useEffect, useState } from "react"
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { usePlayerStore } from "../../store/player"
import { HistoryEvent } from "../../types/history"
import { useHistoryStore } from "../../store/history"

type Props = {
    onClose: () => void
    isVisible: boolean
}

const TransactionModal = (props: Props) => {
    const players = usePlayerStore((state) => state.players)
    const filteredPlayersFrom = players.filter((player) => {
        return player.status === false
    })


    const [data, setData] = useState({
        from: filteredPlayersFrom[0]?.id,
        to: 0,
        amount: 0,
    })

    const updatePlayer = usePlayerStore((state) => state.updatePlayer)
    const addHistoryEvent = useHistoryStore(state => state.addHistoryEvent)

    const handleSendTransaction = () => {
        const sender = players.filter((player) => {
            return player.id === data.from
        })[0]
        const receiver = players.filter((player) => {
            return player.id === data.to
        })[0]

        if (data.amount === 0) {
            return alert("Нельзя передать ноль")
        }

        if (sender.balance >= data.amount) {
            console.log({ id:sender.id, balance: sender.balance-data.amount })
            updatePlayer({ id:sender.id, balance: sender.balance-data.amount })
            updatePlayer({ id:receiver.id, balance: receiver.balance+data.amount })
            addHistoryEvent({
                event: HistoryEvent.transaction,
                transaction_sender_id: sender.id,
                transaction_receiver_id: receiver.id,
                transaction_amount: data.amount,
            });
        } else {
            return alert(`Нельзя передать больше денег, чем есть у: ${sender.name}`)
        }

        props.onClose()
    }

    const handleChangeAmount = (e) => {
        let value = +e.target.value
        const sign = Math.sign(value)

        switch (sign) {
            case -1: // negative
                 value = 0
            break;
            case 1: // positive
                 value
                break;
            case 0: // zero
                 value = 0
                break;
        }
       return setData(s => ({...s, amount: value}))
    }

    // exclude banned and myself
    const filteredPlayers = players.filter((player) => {
        return player.id !== data.from && player.status === false
    })


    useEffect(() => {
        setData(s => ({...s, to: filteredPlayers[0]?.id}))
    }, [])

    return (
        <Modal isVisible={props.isVisible} onClose={props.onClose} modalName="Новая транзакция" className='lg:min-w-[531px] lg:max-w-[531px] lg:min-h-[431px]'>
            <div className="justify-center items-center h-full">
                <div className="flex flex-col">
                    <div className="my-[20px]">
                        <span className="font-semibold text-base">От кого передать</span>
                    </div>
                    <select value={data.from || filteredPlayersFrom[0]?.id} onChange={(e) => setData(s => ({...s, from: +e.target.value}))}>
                        {filteredPlayersFrom.map(player => {
                            return <option key={player.id} value={player.id}>{player.name}</option>
                        })}
                    </select>
                </div>
                <div className="flex flex-col">
                    <div className="my-[20px]">
                        <span className="font-semibold text-base">Кому передать</span>
                    </div>
                    <select value={data.to || filteredPlayers[0]?.id} onChange={(e) => setData(s => ({...s, to: +e.target.value}))}>
                        {filteredPlayers.map((player, idx) => {
                            return <option key={player.id + idx} value={player.id}>{player.name}</option>
                        })}
                    </select>
                    <div className="mt-[20px] flex flex-col">
                        <span className="font-semibold text-base my-[20px]">Сумма транзакции</span>
                        <input
                            type='number'
                            pattern='[0-9]*'
                            inputMode='numeric'
                            placeholder="1000000"
                            value={data.amount}
                            onChange={e => handleChangeAmount(e)}
                        />
                    </div>
                </div>
                <div className="mt-[20px]">
                    <Button onClick={handleSendTransaction} className="text-white">
                        Передать
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default TransactionModal;