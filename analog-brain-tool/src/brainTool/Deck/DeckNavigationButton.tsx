import { LucideIcon } from 'lucide-react';

export interface DeckNavigationButtonProps {
  onClick?: () => void;
  label: string;
  icon: LucideIcon;
  disabled: boolean;
}

export const DeckNavigationButton = ({ onClick, label, icon: Icon, disabled }: DeckNavigationButtonProps) => (
  <button
    {...(!disabled && { onClick: onClick })}
    className={`h-full transition-colors align-stretch rounded-xl [&>svg]:scale-y-[3] ${
      disabled ? 'cursor-default opacity-50' : 'cursor-pointer hover:bg-brain-secondary'
    }`}
    aria-label={label}
    disabled={disabled}
  >
    <Icon size={50} />
  </button>
);
