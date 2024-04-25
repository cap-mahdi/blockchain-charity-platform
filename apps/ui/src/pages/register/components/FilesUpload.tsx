import { FC } from 'react';

export const FilesUpload: FC = () => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor="name">Attach legal files *</label>
      <div className="rounded-lg border-1 border-dashed border-black pl-2 pr-5  py-16  w-full text-gray-900  sm:text-sm sm:leading-6 flex flex-col items-center gap-4">
        <img src="images/files-icon.png" alt="files icon upload" />
        <p>
          Upload any legal Document or File that may be helpful in the process
        </p>
      </div>
      <input type="file" style={{ display: 'none' }} />
    </div>
  );
};
