import React from 'react';
import { Box } from './Box';

export function TokenBox(props) {
  return (
    <Box>
      <div className="flex flex-row items-center justify-center">
        <img
          src="https://seeklogo.com/images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png"
          alt="icon"
          className="w-5 h-5 "
        />
        <span className="text-[#414D55] ml-1">USDT</span>
      </div>
      <div className="text-[#414D55] ml-1">0</div>
    </Box>
  );
}
