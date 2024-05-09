import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <img
        src="/images/black-logo.png"
        alt="Black Logo"
        className="object-cover"
      />
      <div className="flex gap-4">
        <Link to={'#'}>
          <FaFacebookF className="text-black" />
        </Link>
        <Link to={'#'}>
          <FaTwitter className="text-black" />
        </Link>
        <Link to={'#'}>
          <FaInstagram className="text-black" />
        </Link>
        <Link to={'#'}>
          <FaLinkedinIn className="text-black" />
        </Link>
      </div>
    </div>
  );
};
