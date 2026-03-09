import React, { useState, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { useResumeAI } from '../../hooks/useResumeAI';
import { StepWrapper } from '../StepWrapper';
import { AIButton } from '../AIButton';
import { ChevronDown, Trash2 } from 'lucide-react';
import gsap from 'gsap';
import type { Experience } from '../../types/resume';

export const ExperienceStep: React.FC = () => {
  const { resume, updateExperience, deleteExperience, addExperience } = useResume();
  const { generateExperienceBullets, isLoading } = useResumeAI();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleExpanded = (id: string) => {
    const isExpanding = expandedId !== id;
    setExpandedId(isExpanding ? id : null);

    const ref = contentRefs.current[id];
    if (ref) {
      if (isExpanding) {
        gsap.fromTo(
          ref,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
      } else {
        gsap.to(ref, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
      }
    }
  };

  const onBulletsGenerated = (expId: string, bullets: string[]) => {
    updateExperience(expId, { bullets });
    const container = document.getElementById(`bullets-${expId}`);
    if (container) {
      const items = container.querySelectorAll('.bullet-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
      );
    }
  };

  const handleDelete = (id: string) => {
    const item = document.querySelector(`[data-exp-id="${id}"]`);
    if (item) {
      gsap.to(item, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => deleteExperience(id),
      });
    } else {
      deleteExperience(id);
    }
  };

  return (
    <StepWrapper>
      <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-text-primary mb-2">Work Experience</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-accent to-accent-soft rounded-full"></div>
        </div>

        <div className="space-y-4">
          {resume.experiences.map((exp) => (
            <div
              key={exp.id}
              data-exp-id={exp.id}
              className="bg-bg-card rounded-lg border border-border overflow-hidden hover:border-border-hover transition-colors"
            >
              <button
                onClick={() => toggleExpanded(exp.id)}
                className="w-full p-6 flex items-start justify-between hover:bg-bg-secondary/30 transition-colors"
              >
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-text-primary mb-1">{exp.role || 'Job Title'}</h3>
                  <p className="text-sm text-text-secondary mb-2">{exp.company || 'Company'}</p>
                  <p className="text-xs text-text-muted">
                    {exp.startDate || 'Start Date'}
                    {exp.endDate && ` – ${exp.endDate}`}
                    {exp.currentlyWorking && ' – Present'}
                  </p>
                </div>
                <ChevronDown
                  size={20}
                  className="text-accent flex-shrink-0 transition-transform duration-300"
                  style={{
                    transform: expandedId === exp.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <div
                ref={(el) => {
                  if (el) contentRefs.current[exp.id] = el;
                }}
                style={{ height: 0, overflow: 'hidden' }}
              >
                <div className="px-6 pb-6 space-y-4 border-t border-border">
                  <div>
                    <label className="field-label">Job Title</label>
                    <input
                      type="text"
                      className="field-input"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>

                  <div>
                    <label className="field-label">Company</label>
                    <input
                      type="text"
                      className="field-input"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      placeholder="e.g., Google, Acme Corp"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="field-label">Start Date</label>
                      <input
                        type="text"
                        className="field-input"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        placeholder="Jan 2020"
                      />
                    </div>
                    <div>
                      <label className="field-label">End Date</label>
                      <input
                        type="text"
                        className="field-input"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        placeholder="Dec 2023"
                        disabled={exp.currentlyWorking}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`currently-working-${exp.id}`}
                      checked={exp.currentlyWorking}
                      onChange={(e) => updateExperience(exp.id, { currentlyWorking: e.target.checked, endDate: '' })}
                      className="w-4 h-4 rounded accent-accent cursor-pointer"
                    />
                    <label htmlFor={`currently-working-${exp.id}`} className="text-sm text-text-secondary cursor-pointer">
                      I currently work here
                    </label>
                  </div>

                  <div>
                    <AIButton
                      onClick={async () => {
                        try {
                          const bullets = await generateExperienceBullets(exp.company, exp.role, exp.description);
                          onBulletsGenerated(exp.id, bullets);
                        } catch (error) {
                          console.error('Failed to generate bullets:', error);
                        }
                      }}
                      isLoading={isLoading}
                    />
                  </div>

                  <div id={`bullets-${exp.id}`} className="space-y-3">
                    {exp.bullets.map((bullet, idx) => (
                      <div key={idx} className="bullet-item flex gap-3">
                        <span className="text-accent pt-1 flex-shrink-0">•</span>
                        <textarea
                          className="field-input flex-1 resize-none"
                          value={bullet}
                          onChange={(e) => {
                            const newBullets = [...exp.bullets];
                            newBullets[idx] = e.target.value;
                            updateExperience(exp.id, { bullets: newBullets });
                          }}
                          rows={2}
                          placeholder="Add achievement or responsibility..."
                        />
                        <button
                          onClick={() => {
                            const newBullets = exp.bullets.filter((_, i) => i !== idx);
                            updateExperience(exp.id, { bullets: newBullets });
                          }}
                          className="text-error hover:text-error/80 transition-colors p-2 flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => updateExperience(exp.id, { bullets: [...exp.bullets, ''] })}
                    className="w-full py-2 px-3 border border-dashed border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors text-sm"
                  >
                    + Add bullet point
                  </button>

                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="w-full py-2 px-3 border border-error/30 rounded-lg text-error hover:bg-error/5 transition-colors text-sm font-medium"
                  >
                    Delete Entry
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            const newExp: Experience = {
              id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              company: '',
              role: '',
              startDate: '',
              endDate: '',
              currentlyWorking: false,
              description: '',
              bullets: [],
            };
            addExperience(newExp);
          }}
          className="w-full py-3 px-4 border-2 border-dashed border-accent/40 rounded-lg text-accent hover:bg-accent/5 hover:border-accent transition-all text-sm font-semibold uppercase tracking-widest"
        >
          + Add Experience
        </button>
      </div>
    </StepWrapper>
  );
};
