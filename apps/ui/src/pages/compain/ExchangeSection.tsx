import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Box } from './Box';
import { TokenBox, TokenBoxRef } from './TokenBox';
import exchangeBtn from '../../assets/exchange-btn.svg';
import tetherIcon from '../../assets/tetherIcon.png';
import tokenIcon from '../../assets/tokenIcon.png';
import { useParams } from 'react-router-dom';
import useCampaignContext from '../../context/useCampaignContext';
import { ethers } from 'ethers';

const convertTokens = (amount: number, conversionRate: number) => {
  return amount * conversionRate;
};
const conversionRate = 1.5;

export function ExchangeSection(props) {
  const [campainState, setCampaignState] = useCampaignContext();

  const [sourceAmount, setSourceAmount] = useState<number | string>(0);
  const [targetAmount, setTargetAmount] = useState<number | string>(0);
  const handleSourceAmountChange = (newAmount: number | string) => {
    setSourceAmount(newAmount);
    if (typeof newAmount === 'string') {
      newAmount = parseFloat(newAmount);
    }
    const convertedAmount = convertTokens(newAmount, conversionRate);
    setTargetAmount(convertedAmount.toFixed(2));
  };

  const handleTargetAmountChange = (newAmount: number | string) => {
    setTargetAmount(newAmount);
    if (typeof newAmount === 'string') {
      newAmount = parseFloat(newAmount);
    }
    const convertedAmount = convertTokens(newAmount, 1 / conversionRate);
    setSourceAmount(convertedAmount.toFixed(2));
  };

  const params = useParams();
  // console.log(params);
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
            amount={sourceAmount}
            onAmountChange={handleSourceAmountChange}
          />
          <TokenBox
            imageSrc={tokenIcon}
            label="TOKEN"
            amount={targetAmount}
            onAmountChange={handleTargetAmountChange}
          />
          <img
            src={exchangeBtn}
            alt="Exhange Button"
            className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  "
          />
        </div>

        <button
          className="bg-orange text-center h-11  flex flex-col items-center justify-center rounded-lg font-medium"
          onClick={async () => {
            const contract = campainState.contract;
            const amountToSend = ethers.parseEther(sourceAmount + '');
            console.log(sourceAmount);

            if (contract) {
              // const amountToSend = ethers.parseEther(sourceAmount + '');
              const tx = await contract.donate({
                value: sourceAmount,
                gasLimit: 1000000,
              });
              console.log('tx', tx);

              const txrec = await tx.wait();
              console.log(txrec);
            }
          }}
        >
          Donate Now | Be The Impact
        </button>
      </div>
    </div>
  );
}
