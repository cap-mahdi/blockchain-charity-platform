import React from 'react';

export function Avatar({ src, alt = '', className = '' }) {
  return (
    <div className="rounded-full shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
      <img
        src={src}
        alt={alt}
        className={` w-14 h-14 rounded-full  ${className} `}
      />
    </div>
  );
}
