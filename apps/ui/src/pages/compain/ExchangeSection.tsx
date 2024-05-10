import React from 'react';
import { Button } from '../../components/Button';
import { Box } from './Box';
import { TokenBox } from './TokenBox';
import exchangeBtn from '../../assets/exchange-btn.svg';

export function ExchangeSection(props) {
  return (
    <div className="flex flex-row w-full p-5 h-48 ">
      {/* Left Section  */}

      <div className=" w-[65%] bg-yellow-300">Hi</div>

      {/* Divider  */}

      <div className="mx-[10px] w-[0.07rem] bg-[#B8B5B5]"></div>

      {/* Right Section  */}

      <div className="w-[35%]  px-2 flex flex-col justify-between  ">
        <div className=" flex flex-col justify-between gap-2 relative ">
          <TokenBox />
          <TokenBox />
          <img
            src={exchangeBtn}
            className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  "
          />
        </div>

        <div className="bg-orange text-center h-11  flex flex-col items-center justify-center rounded-lg font-medium">
          Donate Now | Be The Impact
        </div>
      </div>
    </div>
  );
}
