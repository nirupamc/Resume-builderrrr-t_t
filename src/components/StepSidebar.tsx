import React, { useEffect, useRef } from 'react';
import { User, Briefcase, BookOpen, Zap, Code2, FileText, Check } from 'lucide-react';
import gsap from 'gsap';

interface StepSidebarProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const steps = [
  { id: 0, title: 'Personal Info', icon: User },
  { id: 1, title: 'Experience', icon: Briefcase },
  { id: 2, title: 'Education', icon: BookOpen },
  { id: 3, title: 'Skills', icon: Zap },
  { id: 4, title: 'Projects', icon: Code2 },
  { id: 5, title: 'Summary', icon: FileText },
];

export const StepSidebar: React.FC<StepSidebarProps> = ({ currentStep, onStepChange }) => {
  const activeIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate active indicator sliding
    const activeStep = document.querySelector(`[data-step="${currentStep}"]`);
    if (activeStep && activeIndicatorRef.current) {
      const top = (activeStep as HTMLElement).offsetTop;
      gsap.to(activeIndicatorRef.current, {
        top: top + 16,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [currentStep]);

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-64 bg-bg-secondary border-r border-border p-6 overflow-y-auto hidden md:flex flex-col z-30">
      {/* Active Indicator Background */}
      <div
        ref={activeIndicatorRef}
        className="absolute left-0 w-1 h-14 bg-gradient-to-b from-accent to-accent-soft rounded-r transition-all"
        style={{ top: '80px' }}
      />

      <nav className="space-y-2 relative z-10">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStep === idx;
          const isCompleted = idx < currentStep;

          return (
            <button
              key={step.id}
              data-step={idx}
              onClick={() => onStepChange(idx)}
              className={`w-full px-4 py-4 rounded-lg flex items-center gap-3 transition-all duration-300 group relative ${
                isActive
                  ? 'bg-bg-card'
                  : isCompleted
                    ? 'hover:bg-bg-card'
                    : 'hover:bg-bg-card'
              }`}
            >
              {/* Icon */}
              <div
                className={`relative flex-shrink-0 ${
                  isActive ? 'scale-110' : ''
                } transition-transform duration-300`}
              >
                {isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <Check className="w-4 h-4 text-bg-primary" />
                  </div>
                ) : (
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isActive
                        ? 'border-accent bg-accent/10'
                        : 'border-border-hover group-hover:border-accent'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="flex flex-col items-start">
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-accent'
                      : isCompleted
                        ? 'text-text-secondary'
                        : 'text-text-secondary group-hover:text-text-primary'
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {isCompleted && (
                <span className="ml-auto text-accent text-xs font-medium">✓</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

