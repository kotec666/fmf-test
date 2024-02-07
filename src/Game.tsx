import React, { useEffect } from "react"
import AllPlayersBoard from "./components/game/AllPlayersBoard";
import ActionModals from "./components/game/ActionModals";
import PlayBlock from "./components/game/PlayBlock";
import GameField from "./components/game/GameField";
import './components/game/board.css'
import { useGameStore } from "./store/game"
import { useBoardStore } from "./store/board"
import { useHistoryStore } from "./store/history"
import { usePlayerStore } from "./store/player"


const Game = () => {


    return (
       <div className="flex flex-col p-[50px]">
           <div className="grid grid-cols-[180px,1fr,184px]">
               <div className="">
                   <AllPlayersBoard />
               </div>
               <div className="pt-[50px]">
                   <PlayBlock />
               </div>
               <div className="">
                   <ActionModals />
               </div>
           </div>
       </div>
    );
};

export default Game;