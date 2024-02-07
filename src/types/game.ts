import { Player } from "./player"

export interface Game {
	 players: Partial<Player>[]
	 currentPlayerQueue: Partial<Player>
	 cubicResult: number
}