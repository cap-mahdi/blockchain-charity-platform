import React from 'react';
import { CiSearch } from 'react-icons/ci';

interface PropsType {
  className: string;
  placeholder: string;
}

export function SearchBar({
  className,
  placeholder = 'Search actions, assocations, posts ....',
}: PropsType) {
  const styles = {
    wrapper: ` flex flex-row p-2.5 items-center `,
    search: ` text-3xl font-bold mr-1.5`,
    input: `bg-transparent placeholder:text-dark-gray text-xs w-[80%] focus:outline-none font-medium placeholder:   text-opacity-70    `,
  };
  return (
    <div className={styles.wrapper + className}>
      <CiSearch className={styles.search} />

      <input type="text" placeholder={placeholder} className={styles.input} />
    </div>
  );
}
