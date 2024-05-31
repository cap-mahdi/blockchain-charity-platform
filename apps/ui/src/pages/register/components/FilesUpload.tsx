import { FC } from 'react';

interface FilesUploadProps {
  title?: string;
  description?: string;
  displayIcon?: boolean;
}

export const FilesUpload = ({
  title,
  description,
  displayIcon = true,
}: FilesUploadProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor="name">{title}</label>
      <div className="rounded-lg border-1 border-dashed border-black pl-2 pr-5  py-16  w-full text-gray-900  sm:text-sm sm:leading-6 flex flex-col items-center gap-4 relative">
        {displayIcon && (
          <img src="images/files-icon.png" alt="files icon upload" />
        )}
        <p>{description}</p>
        <input
          id="file-upload"
          type="file"
          className=" bg-black absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
        />
      </div>
    </div>
  );
};
