import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import ConfirmationDialog from '../ConfirmationDialog';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isLoading?: boolean;
  confirmMessage?: string;
  variant?: 'default' | 'primary';
}

export default function ActionButton({
  icon: Icon,
  label,
  onClick,
  isLoading,
  confirmMessage,
  variant = 'default'
}: ActionButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClick = () => {
    if (confirmMessage) {
      setShowConfirmation(true);
    } else {
      onClick();
    }
  };

  const baseStyles = "flex items-center gap-2 px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const variantStyles = variant === 'primary'
    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90 shadow-lg shadow-cyan-500/20"
    : "bg-white/5 text-white/90 hover:bg-white/10";

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`${baseStyles} ${variantStyles}`}
      >
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </button>

      <ConfirmationDialog
        isOpen={showConfirmation}
        message={confirmMessage || ''}
        onConfirm={() => {
          setShowConfirmation(false);
          onClick();
        }}
        onCancel={() => setShowConfirmation(false)}
      />
    </>
  );
}
