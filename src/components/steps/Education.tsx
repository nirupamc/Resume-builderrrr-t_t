import React, { useState, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { StepWrapper } from '../StepWrapper';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import type { Education } from '../../types/resume';

export const EducationStep: React.FC = () => {
  const { resume, updateEducation, deleteEducation, addEducation } = useResume();
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

  const handleDelete = (id: string) => {
    const item = document.querySelector(`[data-edu-id="${id}"]`);
    if (item) {
      gsap.to(item, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => deleteEducation(id),
      });
    } else {
      deleteEducation(id);
    }
  };

  return (
    <StepWrapper>
      <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-text-primary mb-2">Education</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-accent to-accent-soft rounded-full"></div>
        </div>

        <div className="space-y-4">
          {resume.education.map((edu) => (
            <div
              key={edu.id}
              data-edu-id={edu.id}
              className="bg-bg-card rounded-lg border border-border overflow-hidden hover:border-border-hover transition-colors"
            >
              <button
                onClick={() => toggleExpanded(edu.id)}
                className="w-full p-6 flex items-start justify-between hover:bg-bg-secondary/30 transition-colors"
              >
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-text-primary mb-1">{edu.degree || 'Degree'}</h3>
                  <p className="text-sm text-text-secondary mb-2">{edu.institution || 'Institution'}</p>
                  {edu.field && <p className="text-xs text-text-muted">{edu.field}</p>}
                </div>
                <ChevronDown
                  size={20}
                  className="text-accent flex-shrink-0 transition-transform duration-300"
                  style={{
                    transform: expandedId === edu.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <div
                ref={(el) => {
                  if (el) contentRefs.current[edu.id] = el;
                }}
                style={{ height: 0, overflow: 'hidden' }}
              >
                <div className="px-6 pb-6 space-y-4 border-t border-border">
                  <div>
                    <label className="field-label">Institution/University</label>
                    <input
                      type="text"
                      className="field-input"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                      placeholder="e.g., Stanford University"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="field-label">Degree</label>
                      <input
                        type="text"
                        className="field-input"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        placeholder="e.g., Bachelor of Science"
                      />
                    </div>

                    <div>
                      <label className="field-label">Field of Study</label>
                      <input
                        type="text"
                        className="field-input"
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                        placeholder="e.g., Computer Science"
                      />
                    </div>

                    <div>
                      <label className="field-label">Graduation Year</label>
                      <input
                        type="text"
                        className="field-input"
                        value={edu.graduationYear}
                        onChange={(e) => updateEducation(edu.id, { graduationYear: e.target.value })}
                        placeholder="e.g., 2023"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(edu.id)}
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
            const newEdu: Education = {
              id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              institution: '',
              degree: '',
              field: '',
              graduationYear: '',
            };
            addEducation(newEdu);
          }}
          className="w-full py-3 px-4 border-2 border-dashed border-accent/40 rounded-lg text-accent hover:bg-accent/5 hover:border-accent transition-all text-sm font-semibold uppercase tracking-widest"
        >
          + Add Education
        </button>
      </div>
    </StepWrapper>
  );
};
