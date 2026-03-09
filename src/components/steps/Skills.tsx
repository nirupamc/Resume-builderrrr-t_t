import React, { useState, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import gsap from 'gsap';
import type { Skill } from '../../types/resume';

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const SkillsStep: React.FC = () => {
  const { resume, addSkill, deleteSkill } = useResume();
  const [inputValue, setInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'technical' | 'soft' | 'tools'>('technical');
  const tagRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const handleAddSkill = () => {
    if (inputValue.trim()) {
      const newSkill: Skill = {
        id: generateId(),
        name: inputValue.trim(),
        category: selectedCategory,
      };
      addSkill(newSkill);
      setInputValue('');

      // Animate new tag
      setTimeout(() => {
        const el = tagRefs.current.get(newSkill.id);
        if (el) {
          gsap.from(el, {
            scale: 0.7,
            opacity: 0,
            duration: 0.25,
            ease: 'back.out(1.5)',
          });
        }
      }, 0);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  const handleDeleteSkill = (skillId: string) => {
    const el = tagRefs.current.get(skillId);
    if (el) {
      gsap.to(el, {
        scale: 0.7,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          deleteSkill(skillId);
          tagRefs.current.delete(skillId);
        },
      });
    }
  };

  const categorizedSkills = {
    technical: resume.skills.filter(s => s.category === 'technical'),
    soft: resume.skills.filter(s => s.category === 'soft'),
    tools: resume.skills.filter(s => s.category === 'tools'),
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <h1 className="text-4xl font-serif font-semibold text-text-primary mb-2">
          Skills
        </h1>
        <div className="w-10 h-1 bg-gradient-to-r from-accent to-accent-soft rounded-full" />
        <div className="absolute top-4 right-0 text-9xl font-serif text-accent opacity-5 select-none">04</div>
      </div>

      <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
        <p className="text-sm text-text-secondary">
          Organize skills by category for better ATS recognition.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as 'technical' | 'soft' | 'tools')}
            className="px-4 py-2 bg-bg-card border border-border rounded-lg text-text-primary focus:border-accent outline-none"
          >
            <option value="technical">Technical</option>
            <option value="soft">Soft Skills</option>
            <option value="tools">Tools & Platforms</option>
          </select>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 field-input"
            placeholder="Type a skill and press Enter"
          />
          <button
            onClick={handleAddSkill}
            className="btn btn-primary px-6"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        <div className="space-y-6">
          {Object.entries(categorizedSkills).map(([category, skills]) =>
            skills.length > 0 ? (
              <div key={category} className="space-y-3">
                <h3 className="text-xs uppercase font-semibold tracking-wider text-text-secondary">
                  {category === 'technical' ? 'Technical' : category === 'soft' ? 'Soft Skills' : 'Tools'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      ref={(el) => {
                        if (el) tagRefs.current.set(skill.id, el);
                      }}
                      className="tag group cursor-pointer"
                    >
                      {skill.name}
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="ml-1 opacity-60 group-hover:opacity-100 group-hover:text-error transition-all"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>

      {resume.skills.length === 0 && (
        <div className="text-center py-12 bg-bg-card border border-dashed border-border rounded-lg">
          <p className="text-text-secondary">No skills added yet</p>
        </div>
      )}
    </div>
  );
};
