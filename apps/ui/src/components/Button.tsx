import React from 'react';

export function Button({
  className,
  onClick,
  children,
  disablePointer = false,
}) {
  return (
    <div
      className={
        (disablePointer ? ' ' : 'cursor-pointer ') +
        ' py-2 px-3 rounded-xl font-medium ' +
        className
      }
      onClick={onClick}
    >
      {children}
    </div>
  );
}
