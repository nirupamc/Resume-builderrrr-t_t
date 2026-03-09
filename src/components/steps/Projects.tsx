import React, { useState, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { useResumeAI } from '../../hooks/useResumeAI';
import { StepWrapper } from '../StepWrapper';
import { AIButton } from '../AIButton';
import { ChevronDown, Trash2, X } from 'lucide-react';
import gsap from 'gsap';
import type { Project } from '../../types/resume';

export const ProjectsStep: React.FC = () => {
  const { resume, updateProject, deleteProject, addProject } = useResume();
  const { generateProjectBullets, isLoading } = useResumeAI();
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

  const onBulletsGenerated = (projId: string, bullets: string[]) => {
    updateProject(projId, { bullets });
    const container = document.getElementById(`bullets-${projId}`);
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
    const item = document.querySelector(`[data-proj-id="${id}"]`);
    if (item) {
      gsap.to(item, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => deleteProject(id),
      });
    } else {
      deleteProject(id);
    }
  };

  const addTechStack = (projId: string, tech: string) => {
    const project = resume.projects.find(p => p.id === projId);
    if (project && tech.trim() && !project.techStack.includes(tech.trim())) {
      updateProject(projId, { techStack: [...project.techStack, tech.trim()] });
    }
  };

  const removeTechStack = (projId: string, index: number) => {
    const project = resume.projects.find(p => p.id === projId);
    if (project) {
      updateProject(projId, { techStack: project.techStack.filter((_, i) => i !== index) });
    }
  };

  return (
    <StepWrapper>
      <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-text-primary mb-2">Projects</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-accent to-accent-soft rounded-full"></div>
        </div>

        <div className="space-y-4">
          {resume.projects.map((project) => (
            <div
              key={project.id}
              data-proj-id={project.id}
              className="bg-bg-card rounded-lg border border-border overflow-hidden hover:border-border-hover transition-colors"
            >
              <button
                onClick={() => toggleExpanded(project.id)}
                className="w-full p-6 flex items-start justify-between hover:bg-bg-secondary/30 transition-colors"
              >
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-text-primary mb-1">{project.name || 'Project'}</h3>
                  {project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.techStack.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-xs text-text-muted">+{project.techStack.length - 3} more</span>
                      )}
                    </div>
                  )}
                  {project.link && (
                    <p className="text-xs text-accent truncate">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        {project.link}
                      </a>
                    </p>
                  )}
                </div>
                <ChevronDown
                  size={20}
                  className="text-accent flex-shrink-0 transition-transform duration-300"
                  style={{
                    transform: expandedId === project.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <div
                ref={(el) => {
                  if (el) contentRefs.current[project.id] = el;
                }}
                style={{ height: 0, overflow: 'hidden' }}
              >
                <div className="px-6 pb-6 space-y-4 border-t border-border">
                  <div>
                    <label className="field-label">Project Name</label>
                    <input
                      type="text"
                      className="field-input"
                      value={project.name}
                      onChange={(e) => updateProject(project.id, { name: e.target.value })}
                      placeholder="e.g., Mobile App Dashboard"
                    />
                  </div>

                  <div>
                    <label className="field-label">Project Link</label>
                    <input
                      type="url"
                      className="field-input"
                      value={project.link}
                      onChange={(e) => updateProject(project.id, { link: e.target.value })}
                      placeholder="https://github.com/username/project"
                    />
                  </div>

                  <div>
                    <label className="field-label">Tech Stack</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        className="field-input flex-1"
                        placeholder="e.g., React, TypeScript"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addTechStack(project.id, (e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                      />
                    </div>
                    {project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                          <span key={idx} className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                            {tech}
                            <button
                              onClick={() => removeTechStack(project.id, idx)}
                              className="hover:text-accent/60 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="field-label">Description</label>
                    <textarea
                      className="field-input resize-none"
                      value={project.description || ''}
                      onChange={(e) => updateProject(project.id, { description: e.target.value })}
                      placeholder="What does this project do? What problem does it solve?"
                      rows={3}
                    />
                  </div>

                  <div>
                    <AIButton
                      onClick={async () => {
                        try {
                          const bullets = await generateProjectBullets(project.name, project.techStack, project.description);
                          onBulletsGenerated(project.id, bullets);
                        } catch (error) {
                          console.error('Failed to generate bullets:', error);
                        }
                      }}
                      isLoading={isLoading}
                    />
                  </div>

                  <div id={`bullets-${project.id}`} className="space-y-3">
                    {project.bullets.map((bullet, idx) => (
                      <div key={idx} className="bullet-item flex gap-3">
                        <span className="text-accent pt-1 flex-shrink-0">•</span>
                        <textarea
                          className="field-input flex-1 resize-none"
                          value={bullet}
                          onChange={(e) => {
                            const newBullets = [...project.bullets];
                            newBullets[idx] = e.target.value;
                            updateProject(project.id, { bullets: newBullets });
                          }}
                          rows={2}
                          placeholder="Add achievement or impact..."
                        />
                        <button
                          onClick={() => {
                            const newBullets = project.bullets.filter((_, i) => i !== idx);
                            updateProject(project.id, { bullets: newBullets });
                          }}
                          className="text-error hover:text-error/80 transition-colors p-2 flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => updateProject(project.id, { bullets: [...project.bullets, ''] })}
                    className="w-full py-2 px-3 border border-dashed border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors text-sm"
                  >
                    + Add bullet point
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="w-full py-2 px-3 border border-error/30 rounded-lg text-error hover:bg-error/5 transition-colors text-sm font-medium"
                  >
                    Delete Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            const newProject: Project = {
              id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              name: '',
              techStack: [],
              description: '',
              link: '',
              bullets: [],
            };
            addProject(newProject);
          }}
          className="w-full py-3 px-4 border-2 border-dashed border-accent/40 rounded-lg text-accent hover:bg-accent/5 hover:border-accent transition-all text-sm font-semibold uppercase tracking-widest"
        >
          + Add Project
        </button>
      </div>
    </StepWrapper>
  );
};
