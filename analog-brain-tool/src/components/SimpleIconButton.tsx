import { LucideIcon } from 'lucide-react';

interface SimpleIconButtonProps {
  handleClick: () => void;
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
  className?: string;
}

export function SimpleIconButton({
  handleClick,
  label,
  icon: Icon,
  disabled,
  className,
}: SimpleIconButtonProps) {
  return (
    <button
      onClick={disabled ? undefined : handleClick}
      className={`p-2 rounded-full transition-colors ${
        disabled ? 'cursor-default opacity-50' : 'cursor-pointer hover:bg-brain-secondary'
      } ${className ? className : ''}`}
      aria-label={label}
      disabled={disabled}
    >
      <Icon />
    </button>
  );
}
