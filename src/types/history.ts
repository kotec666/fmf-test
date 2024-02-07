
export enum HistoryEvent {
	"add_player",
	"remove_player",
	"money_add",
	"money_remove",
	"transaction"
}

export interface History {
	id?: number;
	event: HistoryEvent;
	removed_balance_player_id?: number;
	added_balance_player_id?: number;
	removed_balance_amount?: number;
	added_balance_amount?: number;
	added_player_id?: number;
	removed_player_id?: number;
	transaction_sender_id?: number;
	transaction_receiver_id?: number;
	transaction_amount?: number;
}