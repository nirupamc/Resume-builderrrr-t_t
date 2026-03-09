import React, { useEffect, useRef } from 'react';
import { Sparkles, Loader } from 'lucide-react';
import gsap from 'gsap';

interface AIButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
  tooltip?: string;
}

export const AIButton: React.FC<AIButtonProps> = ({
  onClick,
  isLoading,
  disabled = false,
  tooltip = 'Generate with AI',
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (buttonRef.current && !isLoading && !disabled) {
      // Pulse animation
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }
    onClick();
  };

  useEffect(() => {
    if (isLoading && shimmerRef.current) {
      gsap.fromTo(
        shimmerRef.current,
        { x: '-100%' },
        { x: '100%', duration: 1.5, repeat: -1, ease: 'none' }
      );
    }
  }, [isLoading]);

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled || isLoading}
      title={tooltip}
      className="relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-amber-800 hover:from-amber-700 hover:to-amber-900 text-bg-primary font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-glow"
    >
      {isLoading ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          <span>Generating...</span>
          <div
            ref={shimmerRef}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-lg"
            style={{ width: '100%' }}
          />
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          <span>Generate with AI</span>
        </>
      )}
    </button>
  );
};

