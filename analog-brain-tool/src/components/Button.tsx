import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick?: () => void;
  className?: string;
  children: ReactNode;
}
//TODO accessibility: onClick should not be defined if there is no function for it
export const Button = ({ handleClick, className, children, ...props }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={`bg-brain-secondary hover:bg-brain-secondary-hover text-white px-4 py-2 rounded-md text-sm transition-colors ${
        className ? className : undefined
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
