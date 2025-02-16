import { PropsWithChildren } from 'react';

interface CardSelectorButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  disabled?: boolean;
  className?: string;
}

const CardSelectorButton: React.FC<PropsWithChildren<CardSelectorButtonProps>> = ({
  children,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`${disabled ? 'cursor-default' : 'cursor-pointer'} rounded-b-2xl border-2 p-2 ${className}`}
    >
      <div className={`${disabled ? 'opacity-50' : null}`}>{children}</div>
    </button>
  );
};

export default CardSelectorButton;
