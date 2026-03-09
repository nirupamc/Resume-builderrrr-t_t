import React, { useEffect, useRef } from 'react';
import { Download, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useResume } from '../context/ResumeContext';
import { exportResumePDF } from '../utils/pdfExport';
import { toast } from 'react-hot-toast';

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, totalSteps }) => {
  const { resume } = useResume();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate progress line
    if (progressRef.current) {
      const progress = ((currentStep + 1) / totalSteps) * 100;
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }, [currentStep, totalSteps]);

  const handleExportPDF = () => {
    const content = document.getElementById('resume-preview-content');
    if (content) {
      const htmlContent = content.innerHTML;
      exportResumePDF(resume, htmlContent);
      toast.success('Resume exported as PDF!');
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-bg-secondary z-50">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-accent to-accent-soft"
          style={{ width: '0%' }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 border-b border-border bg-bg-primary flex items-center justify-between px-8 backdrop-blur-sm z-40">
        {/* Logo */}
        <div className="text-2xl font-serif font-light italic text-accent">
          resumé.
        </div>

        {/* Step Counter */}
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="font-medium">Step {currentStep + 1}</span>
          <span className="text-text-muted">/</span>
          <span className="font-medium">{totalSteps}</span>
          <div className="flex gap-1 ml-3">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i <= currentStep ? 'bg-accent' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-6 py-2 border border-accent text-accent rounded-lg hover:bg-accent hover:text-bg-primary transition-all duration-300 font-medium text-sm"
        >
          <Download className="w-4 h-4" />
          Export PDF
          <ChevronRight className="w-4 h-4" />
        </button>
      </header>
    </>
  );
};
