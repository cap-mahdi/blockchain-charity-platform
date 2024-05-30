import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Box } from './Box';

interface TokenBoxProps {
  imageSrc: string;
  label: string;
  changeToken: number | string | undefined;
  handleChangeToken: () => {};
}

export interface TokenBoxRef {
  amount: string | undefined;
}

export const TokenBox = forwardRef(
  ({ imageSrc, label, changeToken, handleChangeToken }: TokenBoxProps, ref) => {
    const [amount, setAmount] = React.useState<number | string>(0);

    console.log(changeToken);

    useImperativeHandle(ref, () => ({
      amount,
    }));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setAmount(inputValue);
    };

    const handleBlur = () => {
      const floatValue = parseFloat(amount as string);
      if (!isNaN(floatValue)) {
        setAmount(floatValue);
      } else {
        setAmount('');
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
          className="text-[#414D55] ml-1 bg-transparent w-24 text-right"
          value={amount}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Box>
    );
  }
);

