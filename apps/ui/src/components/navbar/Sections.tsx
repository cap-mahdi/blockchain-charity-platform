import React, { useState } from 'react';
import { Link } from 'react-router-dom';
interface PropsType {
  sections: string[];
  uppercase: boolean;
  classname: string;
}

export function Sections({
  sections = ['home', 'register', 'Create campaign', 'Associations'],
  routes = {
    home: '/',
    register: '/register',
    'Create campaign': '/create-campaign',
    'contact us': '/',
    Associations: '/associations',
  },
  uppercase = true,
  classname = '',
}) {
  const [selected, setSelected] = useState(0);
  const [hover, setHover] = useState(0);
  const styles = {
    wrapper: `py-2.5 flex flex-row items-center justify-between gap-4 `,
    selectedStyle: ` font-bold underline decoration-2 underline-offset-4 `,
    hoverStyle: ` hover:font-bold hover:underline hover:decoration-2 hover:underline-offset-4 hover:ease-in-out hover:transition-all  `,
    sectionStyle: ` cursor-pointer  ease-in-out transition-all `,
  };

  return (
    <div
      className={styles.wrapper + classname}
      onMouseLeave={() => {
        setHover(selected);
      }}
    >
      {sections.map((section, i) => (
        <Link to={routes[section]}>
          <h1
            className={
              styles.sectionStyle +
              `${
                selected === i && hover === selected ? styles.selectedStyle : ''
              } ` +
              styles.hoverStyle
            }
            onClick={() => {
              setSelected(i);
            }}
            onPointerEnter={() => {
              setHover(i);
            }}
          >
            {uppercase ? section.toUpperCase() : section}
          </h1>
        </Link>
      ))}
    </div>
  );
}
