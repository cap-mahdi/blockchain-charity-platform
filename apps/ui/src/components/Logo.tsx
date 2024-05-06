import React from 'react';
import logo from '../assets/logo.png';

export function Logo({ className, onClick }) {
  return <img src={logo} alt="Logo" className={className} onClick={onClick} />;
}
