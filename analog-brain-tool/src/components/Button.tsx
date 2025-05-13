import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick?: () => void;
  className?: string;
  children: ReactNode;
}

export const Button = ({ handleClick, className, children, ...props }: ButtonProps) => {
  return (
    <button
      {...(handleClick && { onClick: handleClick })}
      className={`bg-brain-secondary hover:bg-brain-secondary-hover text-white px-4 py-2 rounded-md text-sm transition-colors ${
        className ? className : undefined
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
