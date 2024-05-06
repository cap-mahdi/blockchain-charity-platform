import React from 'react';

export function Card({ children, className = 'py-8 px-8' }) {
  const style =
    'flex flex-col items-center gap-6   w-2/3 bg-white rounded-xl b shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ' +
    className;
  return <div className={style}>{children}</div>;
}
