import React from 'react';

export function Card({ children, className }) {
  return (
    <div
      className={
        'bg-white w-fit p-2 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] box-border m-10 ' +
        className
      }
    >
      {children}
    </div>
  );
}
