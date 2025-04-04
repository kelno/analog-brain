import { PropsWithChildren } from 'react';

interface CardSelectorButtonProps {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  disabled?: boolean;
  className?: string;
}

export const CardSelectorButton: React.FC<PropsWithChildren<CardSelectorButtonProps>> = ({
  children,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`${
        disabled ? 'cursor-default' : 'cursor-pointer'
      } rounded-2xl border-2 p-2 border-brain-secondary ${className ? className : ''}`}
    >
      <div className={`${disabled ? 'opacity-50' : ''}`}>{children}</div>
    </button>
  );
};
