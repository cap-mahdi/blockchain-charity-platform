import { useState } from 'react';
import useMetaMask from '../../hooks/useMetaMask';
import { Button } from '../Button';
import { Logo } from '../Logo';
import { SearchBar } from '../SearchBar';
import { Sections } from './Sections';
import { MetamaskBtn } from './MetamaskBtn';

export function Navbar() {
  const [connectHover, setConnectHover] = useState(false);
  const [connectedWallet, connectWallet] = useMetaMask();

  const fixedHeight = 'h-[60%]';
  const styles = {
    wrapper: `w-[100%] h-20 bg-white flex flex-row text-black items-center  justify-between  px-4 `,
    searchBar: `w-[40%] bg-light-gray ${fixedHeight} rounded-full `,
    joinUs: `w-28 h-[100%] bg-orange rounded-full font-medium ${
      connectHover ? 'hidden' : ''
    } `,
    connectBtn: `bg-light-gray h-[100%]  rounded-full font-medium`,
  };
  return (
    <div className="fixed w-[100%]  z-[1000] ">
      <div className={styles.wrapper}>
        <div className="w-[65%] flex flex-row items-center  justify-between ">
          <Logo className={`${fixedHeight}`} />
          <SearchBar className={styles.searchBar} />
          {/* Sections */}
          <Sections classname="w-[40%]" />
        </div>
        {/* Join us  */}
        {!connectedWallet ? (
          <div className={` flex flex-row items-center  gap-4  ${fixedHeight}`}>
            <button className={styles.joinUs}>Join Us</button>
            {/* Connect btn  */}
            <MetamaskBtn
              className={styles.connectBtn}
              setConnectHover={setConnectHover}
              connectWallet={connectWallet}
            />
          </div>
        ) : (
          // <div className="flex flex-row items-center gap-3">
          //   <IoOptionsOutline className="h-8 w-8  " />
          //   <Avatar src="https://www.croissant-rouge.tn/logo.png" />
          // </div>
          <Button className="bg-orange text-sm">
            Connected as {connectedWallet}
          </Button>
        )}
      </div>
      {/* <div className="w-[100%] h-3 bg-light-gray"></div> */}
    </div>
  );
}
