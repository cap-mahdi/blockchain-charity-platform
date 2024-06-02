import React, { FC, useRef, useState } from 'react';

interface FilesUploadProps {
  title?: string;
  description?: string;
  displayIcon?: boolean;
  files?: File[];
  setFiles?: (files: File[]) => void;
}

export const FilesUpload: FC<FilesUploadProps> = ({
  title,
  description,
  displayIcon = true,
  files = [],
  setFiles,
}) => {
  const [localFiles, setLocalFiles] = useState<File[]>(files);
  const uploadButtonRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];
      setLocalFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, newFile];
        setFiles && setFiles(updatedFiles);
        return updatedFiles;
      });

      if (uploadButtonRef.current) {
        uploadButtonRef.current.value = '';
      }
    }
  };

  const removeFile = (index: number) => {
    setLocalFiles((prevFiles) => {
      const newFiles = prevFiles.filter((_, i) => i !== index);
      setFiles && setFiles(newFiles);
      return newFiles;
    });
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex flex-row justify-between w-full gap-2">
        <label htmlFor="name">{title}</label>
        <button
          className="bg-black text-white px-2 py-1 rounded-lg"
          onClick={() => uploadButtonRef.current?.click()}
          type="button"
        >
          + Add File{' '}
        </button>
      </div>
      <div className="rounded-lg border-1 border-dashed border-black pl-2 pr-5 py-16 w-full text-gray-900 sm:text-sm sm:leading-6 flex flex-col items-center gap-4 relative">
        {localFiles.length === 0 && displayIcon && (
          <img src="images/files-icon.png" alt="files icon upload" />
        )}

        {localFiles.length === 0 && <p>{description}</p>}
        {localFiles.length > 0 && (
          <div className="flex flex-row gap-1 w-full flex-wrap">
            {localFiles.map((file, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 items-center relative"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="file preview"
                  className="w-64 object-cover"
                />
                <p>{file.name}</p>
                <button
                  type="button"
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                  onClick={() => removeFile(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          ref={uploadButtonRef}
        />
      </div>
    </div>
  );
};
