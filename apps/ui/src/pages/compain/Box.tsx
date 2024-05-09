import React from 'react';

export function Box({ children }) {
  return (
    <div className="py-2 px-2 rounded-lg font-medium bg-[#A2C4D455] border-[#B8D2DE] border  h-11 flex flex-row items-center justify-between">
      {children}
    </div>
  );
}
