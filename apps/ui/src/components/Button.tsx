interface ButtonProps {
  className?: string;
  onClick?: () => void | Promise<void>;
  children: React.ReactNode;
  disablePointer?: boolean;
}
export function Button({
  className = '',
  onClick,
  children,
  disablePointer = false,
}: ButtonProps) {
  return (
    <div
      className={
        (disablePointer ? ' ' : 'cursor-pointer ') +
        ' py-2 px-3 rounded-xl font-medium ' +
        className
      }
      onClick={onClick}
    >
      {children}
    </div>
  );
}
