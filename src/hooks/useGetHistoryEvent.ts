import { History, HistoryEvent } from "../types/history"
import { beautifyNumber } from "../helpers/beautifyNumber"
import { getPlayerNicknameById } from "../helpers/getPlayerNicknameById"
import { usePlayerStore } from "../store/player"

export const useGetHistoryEvent = (data: History[]) => {
	const players = usePlayerStore((state) => state.players)
	const mappedHistory = () => {
	 return data.map(historyItem => {
			switch (historyItem.event) {
				case HistoryEvent.add_player:
					return `В игру добавлен игрок: ${getPlayerNicknameById(historyItem.added_player_id, players)}`
				case HistoryEvent.remove_player:
					return `Игрок: ${getPlayerNicknameById(historyItem.removed_player_id, players)} выбыл из игры.`
				case HistoryEvent.money_add:
					return `Добавлен баланс для игрока: ${getPlayerNicknameById(historyItem.added_balance_player_id, players)}, +${beautifyNumber(historyItem.added_balance_amount)}`
				case HistoryEvent.money_remove:
					return `Уменьшен баланс для игрока: ${getPlayerNicknameById(historyItem.removed_balance_player_id, players)}, ${beautifyNumber(historyItem.removed_balance_amount)}`
				case HistoryEvent.transaction:
					return `Игрок с ником "${getPlayerNicknameById(historyItem.transaction_sender_id, players)}" передает ${beautifyNumber(historyItem.transaction_amount)} игроку с ником ${getPlayerNicknameById(historyItem.transaction_receiver_id, players)}`
			}
		})
	}

	return mappedHistory()


}