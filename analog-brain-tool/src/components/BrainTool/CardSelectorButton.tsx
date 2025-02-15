import { PropsWithChildren } from 'react';

interface CardSelectorButtonProps {
  className?: string;
}

const CardSelectorButton: React.FC<PropsWithChildren<CardSelectorButtonProps>> = ({
  children,
  className,
}) => {
  return <button className={`rounded-b-2xl border-2 p-2 ${className}`}>{children}</button>;
};

export default CardSelectorButton;
