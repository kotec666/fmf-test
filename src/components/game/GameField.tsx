import React from 'react';
import classNames from 'classnames';
import {beautifyNumber} from "../../helpers/beautifyNumber";
import { usePlayerStore } from "../../store/player"
import { Player } from "../../types/player"
import PlayerIcon from "./../ui/Player";

type Props = {
    id: number;
    className?: string
    money: number
    players: Player[]
}
const GameField = (props: Props) => {
    const players = usePlayerStore((state) => state.players);

    const playersOnThisBoard = players.filter((player) => {
      return player.position === props.id && !player.status
    })

  const getRandomPosition = () => {
    const min = 1;
    const max = 130;
    const x = Math.floor(Math.random() * (max - min + 1)) + min;
    const y = Math.floor(Math.random() * (max - min + 1)) + min;
    return { x, y };
  }

    return (
        <div className={classNames("w-full h-[150px] rounded-[12px] flex items-center justify-center text-black relative", {
            "bg-green-main/70":!props?.money?.toString()?.includes("-"),
            "bg-red-error/70":props?.money?.toString()?.includes("-"),
        }, props.className)}>
           <span className="font-bold text-[24px] text-center whitespace-pre-wrap">{beautifyNumber(props.money)} монет</span>
            <div className="">
              {playersOnThisBoard.map((player) => {
                const { x, y } = getRandomPosition();
                return (
                  <div key={player.id} style={{ position: "absolute", top: `${y}px`, left: `${x}px`, transform: "translate(-50%, -50%)" }}>
                    <PlayerIcon name={player.name} />
                  </div>
                );
              })}
            </div>
        </div>
    );
};

export default GameField;