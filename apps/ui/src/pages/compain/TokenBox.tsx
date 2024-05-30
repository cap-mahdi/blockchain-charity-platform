import React from 'react';
import { Box } from './Box';

interface TokenBoxProps {
  imageSrc: string;
  label: string;
  amount: number | string;
  onAmountChange: (newAmount: number | string) => void;
}

export const TokenBox = ({
  imageSrc,
  label,
  amount,
  onAmountChange,
}: TokenBoxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onAmountChange(inputValue);
  };

  const handleBlur = () => {
    const floatValue = parseFloat(amount as string);
    if (!isNaN(floatValue)) {
      onAmountChange(floatValue);
    } else {
      onAmountChange(0);
    }
  };

  return (
    <Box>
      <div className="flex flex-row items-center justify-center">
        <img src={imageSrc} alt="icon" className="w-5 h-5 " />
        <span className="text-[#414D55] ml-1">{label}</span>
      </div>
      <input
        type="text"
        className="text-[#414D55] ml-1 bg-transparent w-24 text-right focus:outline-none"
        value={amount}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Box>
  );
};
