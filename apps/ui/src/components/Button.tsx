type ButtonProps = {
  className?: string;
  onClick?: () => void | Promise<void>;
  children: React.ReactNode;
  disablePointer?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
export function Button({
  className = '',
  onClick,
  children,
  disablePointer = false,
  ...props
}: ButtonProps) {
  return (
    <div
      className={
        (disablePointer ? ' ' : 'cursor-pointer ') +
        ' py-2 px-3 rounded-xl font-medium ' +
        className
      }
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
