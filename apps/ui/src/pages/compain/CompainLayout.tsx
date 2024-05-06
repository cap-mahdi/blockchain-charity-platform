import React from 'react';
import { Card } from '../../components/Card';
import { Avatar } from '../../components/Avatar';

export function CompainLayout({ children }) {
  return (
    <Card className={' bg-orange  '}>
      <div className="w-full relative ">
        <div className="w-full h-full rounded-t-lg  ">
          <img
            src="https://t4.ftcdn.net/jpg/06/63/56/91/360_F_663569167_VxVzxNrHLwDrbgZphGLwCHU4c1w5668W.jpg"
            className=" inset-0 z-0 w-full rounded-t-lg  "
            alt="placeholder"
          />
          <div
            style={{
              background:
                'linear-gradient(180deg, rgba(165,165,165,0.6) 0%, rgba(0,0,0,0) 40%, rgba(255,255,255,0.37) 70%, rgba(255,255,255,0.41) 81%, rgba(255,255,255,0.95) 94%, rgba(255,255,255,1) 98%) ',
            }}
            className="absolute w-full h-full inset-0 z-1 rounded-t-lg   "
          ></div>
          <div className="absolute pt-6  inset-0 z-2  flex flex-col items-center   ">
            <h1 className="font-bold text-[2rem] underline underline-offset-[10px]">
              #Free_Palestine
            </h1>
            <h1 className="font-medium text-black text-[1rem] ">
              Humanitarian
            </h1>
            <Avatar
              className="absolute top-10 right-7 w-15 h-15"
              src="https://www.croissant-rouge.tn/logo.png"
            />
          </div>
        </div>
      </div>
      {children}
    </Card>
  );
}
