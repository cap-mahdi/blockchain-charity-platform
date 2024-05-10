import React from 'react';
import { Navbar } from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components';

export function AppLayout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-fit  pb-5 pt-24 ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
