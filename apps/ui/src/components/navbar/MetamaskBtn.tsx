import React, { useState } from 'react';
import metamask from '../../assets/MetamaskLogo.png';

export function MetamaskBtn({ className, setConnectHover, connectWallet }) {
  const [hover, setHover] = useState(false);

  // const [connected, setHover] = useState(false);
  const styles = {
    wrapper: `flex flex-row items-center pl-4 overflow-hidden   `,
    roleButton: ` bg-orange h-[100%] w-[8rem] rounded-bl-full  `,
    userButton: ` rounded-tr-full   `,
    associationButton: `  `,
    hover: ``,
  };

  return (
    <div
      className={styles.wrapper + className + styles.hover}
      onMouseEnter={() => {
        setHover(true);
        setConnectHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
        setConnectHover(false);
      }}
    >
      <img src={metamask} alt="Metamask logo" className={' h-[90%]'} />
      <h1
        className={`pr-4 ${
          !hover ? 'opacity-100' : 'hidden'
        } transition-opacity duration-500 ease-in-out`}
      >
        Connect your wallet
      </h1>
      <div
        className={`${
          hover ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500 ease-in-out flex flex-row items-center h-[100%]`}
      >
        {!hover ? (
          ''
        ) : (
          <>
            <h1>Connect as </h1>
            <button
              className="bg-orange h-[100%] w-[8rem] rounded-bl-full rounded-tr-full"
              onClick={() => {
                connectWallet();
              }}
            >
              User
            </button>
            <button className="bg-orange h-[100%] w-[8rem] rounded-bl-full ">
              Association
            </button>
          </>
        )}
      </div>
    </div>
  );
}
