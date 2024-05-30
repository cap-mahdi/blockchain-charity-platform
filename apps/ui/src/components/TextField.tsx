import { FC } from 'react';

interface TextFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  reqiuired?: boolean;
  value?: string | number;
  onChange?: (e: any) => void;
}

export const TextField: FC<TextFieldProps> = ({
  name,
  placeholder,
  reqiuired = false,
  type = 'text',
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name}>
        {name} {reqiuired && '*'}
      </label>
      <input
        type={type}
        className="rounded-lg border-1 border-black py-1.5 pl-2 pr-5 h-12 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
