import { ReactNode } from 'react';

interface ButtonProps {
  handleClick: () => void;
  className?: string;
  children: ReactNode;
}
export const Button = ({ handleClick, className, children }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={`bg-brain-secondary hover:bg-brain-secondary-hover text-white px-4 py-2 rounded-md text-sm transition-colors ${
        className ? className : undefined
      }`}
    >
      {children}
    </button>
  );
};
