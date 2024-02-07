import React from 'react';
import Player from "../ui/Player";
import { usePlayerStore } from "../../store/player"
import { beautifyNumber } from "../../helpers/beautifyNumber"

const AllPlayersBoard = () => {
    const players = usePlayerStore((state) => state.players);

    return (
        <div className="flex flex-col gap-y-[20px]">
            {players.map((player) => {
                return (
                  <div key={player.id} className="flex flex-row items-center gap-x-[13px] border-b-[1px]">
                         <Player name={player.name} />
                      <div className="flex flex-col justify-between">
                          <div>
                              <span className="text-[14px]">{player.status ? "Выбыл" : "В игре"}</span>
                          </div>
                          <div className="mt-[10px]">
                              <span className="text-[14px]">Баланс {beautifyNumber(player.balance)}</span>
                          </div>
                      </div>
                  </div>
                )
            })}
        </div>
    );
};

export default AllPlayersBoard;