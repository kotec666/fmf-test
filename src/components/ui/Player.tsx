import React from 'react';

type Props = {
  name: string
}
const Player = (props: Props) => {
    return (
           <div className="w-[110px]">
               <div className="flex flex-col relative justify-start items-center ">
                   <div className="z-[2]">
                       <img src="/svg/player.svg" className="relative" />
                   </div>
                   <div className="absolute top-[30px] ">
                       <span className="bg-grey-f1 rounded-[8px] text-black py-[2px] px-[18px] text-[12px]">{props.name}</span>
                   </div>
               </div>
           </div>
    );
};

export default Player;