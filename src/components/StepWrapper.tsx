import React, { useRef } from 'react';

interface StepWrapperProps {
  children: React.ReactNode;
}

export const StepWrapper: React.FC<StepWrapperProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
};
