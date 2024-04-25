import React, { useState } from 'react';
import { Logo } from '../Logo';
import { SearchBar } from '../SearchBar';
import { Sections } from './Sections';
import { MetamaskBtn } from './MetamaskBtn';
import { Avatar } from '../Avatar';
import { IoOptionsOutline } from 'react-icons/io5';

export function Navbar(props) {
  const [connectHover, setConnectHover] = useState(false);
  const connected = false;
  const fixedHeight = 'h-[60%]';
  const styles = {
    wrapper: `w-screen h-20 bg-white flex flex-row text-black items-center  justify-between   px-4 `,
    searchBar: `w-[40%] bg-light-gray ${fixedHeight} rounded-full `,
    joinUs: `w-28 h-[100%] bg-orange rounded-full font-medium ${
      connectHover ? 'hidden' : ''
    } `,
    connectBtn: `bg-light-gray h-[100%]  rounded-full font-medium`,
  };
  return (
    <div className={styles.wrapper}>
      <div className="w-[65%] flex flex-row items-center  justify-between ">
        <Logo className={`${fixedHeight}`} />
        <SearchBar className={styles.searchBar} />
        {/* Sections */}
        <Sections classname="w-[40%]" />
      </div>
      {/* Join us  */}
      {!connected ? (
        <div className={` flex flex-row items-center  gap-4  ${fixedHeight}`}>
          <button className={styles.joinUs}>Join Us</button>
          {/* Connect btn  */}
          <MetamaskBtn
            className={styles.connectBtn}
            setConnectHover={setConnectHover}
          />
        </div>
      ) : (
        <div className="flex flex-row items-center gap-3">
          <IoOptionsOutline className="h-8 w-8  " />
          <Avatar src="https://www.croissant-rouge.tn/logo.png" />
        </div>
      )}
    </div>
  );
}
