
import React, { useEffect } from 'react';
import { Button } from '../../components/Button';
import { Box } from './Box';
import { TokenBox, TokenBoxRef } from './TokenBox';
import exchangeBtn from '../../assets/exchange-btn.svg';
import tetherIcon from '../../assets/tetherIcon.png';
import tokenIcon from '../../assets/tokenIcon.png';

export function ExchangeSection(props) {
  const sourceTokenBoxRef = React.useRef<TokenBoxRef>(null);
  const targetTokenBoxRef = React.useRef<TokenBoxRef>(null);

  useEffect(() => {
    console.log(sourceTokenBoxRef.current?.amount);
    console.log(targetTokenBoxRef.current?.amount);
  }, [sourceTokenBoxRef.current?.amount, targetTokenBoxRef.current?.amount]);

  return (
    <div className="flex flex-row w-full p-5 h-48 ">
      {/* Left Section  */}

      <div className=" w-[65%] bg-yellow-300">Hi</div>

      {/* Divider  */}

      <div className="mx-[10px] w-[0.07rem] bg-[#B8B5B5]"></div>

      {/* Right Section  */}

      <div className="w-[35%]  px-2 flex flex-col justify-between  ">
        <div className=" flex flex-col justify-between gap-2 relative ">
          <TokenBox
            imageSrc={tetherIcon}
            label="USDT"
            ref={sourceTokenBoxRef}
            changeToken={targetTokenBoxRef.current?.amount}
            handleChangeToken={() => {}}
          />
          <TokenBox
            imageSrc={tokenIcon}
            label="TOKEN"
            ref={targetTokenBoxRef}
            changeToken={sourceTokenBoxRef.current?.amount}
            handleChangeToken={() => {}}
          />
          <img
            src={exchangeBtn}
            alt="Exhange Button"
            className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer "

          />
        </div>

        <div className="bg-orange text-center h-11  flex flex-col items-center justify-center rounded-lg font-medium">
          Donate Now | Be The Impact
        </div>
      </div>
    </div>
  );
}
