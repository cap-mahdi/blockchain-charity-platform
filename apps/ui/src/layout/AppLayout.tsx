import React from 'react';
import { Navbar } from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function AppLayout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-fit  pb-5 pt-24 ">
        <ToastContainer position="bottom-left" transition={Bounce} />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
