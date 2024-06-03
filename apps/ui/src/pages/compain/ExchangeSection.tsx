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
import { BsCurrencyDollar } from 'react-icons/bs';
import { ProgressBar } from '../../components/ProgressBar';

const convertTokens = (amount: number, conversionRate: number) => {
  return amount * conversionRate;
};
const conversionRate = 1.5;
const ETHERSCAN_URL = import.meta.env.VITE_ETHERSCAN_URL;

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
  console.log(ETHERSCAN_URL + '/address/' + params?.campaignAddress);
  return (
    <div className="flex flex-row w-full p-5 h-48 ">
      {/* Left Section  */}

      <div className="flex flex-col gap-2 w-[65%]">
        <Box>
          <div className="flex flex-row items-center justify-center w-full h-full">
            <div className="ml-1 w-[50%] border-r-[1.5px] border-[#B8B5B5] h-full">
              <h1 className="text-[8px] font-medium text-light-blue ">
                TOTAL RAISED
              </h1>
              <div className="flex items-center gap-1">
                <BsCurrencyDollar className="w-4 h-4  text-dark-gray font-bold" />

                <h1 className="text-[14px] font-bold leading-[0.7rem] text-dark-gray">
                  254.99
                </h1>
              </div>
            </div>

            <div className="ml-1 w-[50%]">
              <h1 className="text-[8px] font-medium text-light-blue ">
                TOTAL RAISED
              </h1>
              <div className="flex items-center gap-1">
                <img src={tetherIcon} alt="icon" className="w-4 h-4 " />

                <h1 className="text-[14px] font-bold leading-[0.7rem] text-dark-gray">
                  254.99
                </h1>
              </div>
            </div>
          </div>
        </Box>

        <ProgressBar
          width={'100%'}
          percentage={50}
          label={{ text: '3 days 2 hours 45 minutes left', size: 10 }}
        />
        <Box>
          <div className="flex flex-rox gap-2 items-center">
            <img src={tetherIcon} alt="icon" className="w-5 h-5 " />
            <a
              href={ETHERSCAN_URL + '/address/' + params?.campaignAddress}
              target="blank"
              className="text-[1vw] font-medium text-[#414D55] "
            >
              <h1 className="text-[1vw] font-medium text-[#414D55] ">
                {params?.campaignAddress}
              </h1>
            </a>
          </div>
        </Box>
      </div>

      {/* Divider  */}

      <div className="mx-[10px] w-[0.07rem] bg-[#B8B5B5]"></div>

      {/* Right Section  */}

      <div className="w-[35%]  pl-2 flex flex-col justify-between  ">
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
