import { FC } from 'react';

interface TextAreaProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  captionText?: string;
}

export const TextArea: FC<TextAreaProps> = ({
  name,
  placeholder,
  required,
  captionText,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full items-start">
      <label htmlFor={name}>
        {' '}
        {name} {required && '*'}
      </label>
      <textarea
        className="rounded-lg border-1 border-black py-1.5 pl-2 pr-5 h-72 w-full text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
        placeholder={placeholder}
        style={{ resize: 'none' }} /* to prevent resizing */
      />
      {captionText && (
        <caption className="text-sm text-dark-gray">{captionText}</caption>
      )}
    </div>
  );
};