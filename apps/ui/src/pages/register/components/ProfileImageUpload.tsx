import { FC } from 'react';

export const ProfileImageUpload: FC = () => {
  return (
    <div className="flex flex-row gap-3 w-full items-start pb-1">
      <img
        className="inline-block h-10 w-10 rounded-full object-cover shadow-lg shadow-gray "
        src="images/default-avatar.png"
        alt=""
      />
      <button className="bg-orange text-black py-2 px-6 text-sm font-medium rounded-full">
        Change
      </button>
    </div>
  );
};
