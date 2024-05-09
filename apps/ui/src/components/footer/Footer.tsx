import { Logo } from './Logo';
import { items } from './data';
import { PiNavigationArrow } from 'react-icons/pi';

export const Footer = () => {
  return (
    <footer className="bg-orange h-full w-full flex flex-col justify-center items-center gap-3 px-16 pb-8  ">
      <div className="flex flex-row gap-24 p-8 items-start">
        <Logo />
        {items.map((item) => (
          <div key={item.title} className="flex flex-col gap-10">
            <h3 className="text-black font-bold ">{item.title}</h3>
            <ul className="flex flex-col gap-5">
              {Object.entries(item.links).map(([name, link]) => (
                <li key={name}>
                  <a className="text-black" href={link}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col gap-10">
          <h3 className="text-black font-bold ">About us</h3>
          <ul className="flex flex-col gap-5 text-sm">
            <li className="w-2/3">you can contact Us to send email to us</li>
            <li className="flex flex-row gap-5 bg-white rounded-3xl justify-between items-center px-3 py-3">
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent text-sm flex-1  focus:outline-none"
              />
              <div className="bg-black rounded-full cursor-pointer p-1  w-8 h-8 flex justify-center items-center ">
                <PiNavigationArrow
                  color="white"
                  style={{
                    transform: 'rotate(135deg)',
                  }}
                  className="w-full h-full"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <hr className="w-full border-1 bg-black" />
      <p>© 2022 Mangcoding | Powered by mangcoding</p>
    </footer>
  );
};
