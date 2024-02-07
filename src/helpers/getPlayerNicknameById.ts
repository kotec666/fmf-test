import { Player } from "../types/player"

export const getPlayerNicknameById = (foundId: number, players: Player[]): string => { // искомый игрок
	return players.filter(player => {
		return player.id === foundId
	})[0]?.name
}