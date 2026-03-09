import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ResumeData, PersonalInfo, Experience, Education, Skill, Project } from '../types/resume';

interface ResumeContextType {
  resume: ResumeData;
  setPersonalInfo: (info: PersonalInfo) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setSummary: (summary: string) => void;
  setTargetJobTitle: (title: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    location: '',
    jobTitle: '',
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  summary: '',
  targetJobTitle: '',
};

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resume, setResume] = useState<ResumeData>(initialResumeData);

  const setPersonalInfo = (info: PersonalInfo) => {
    setResume(prev => ({ ...prev, personalInfo: info }));
  };

  const addExperience = (exp: Experience) => {
    setResume(prev => ({ ...prev, experiences: [...prev.experiences, exp] }));
  };

  const updateExperience = (id: string, exp: Partial<Experience>) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => e.id === id ? { ...e, ...exp } : e),
    }));
  };

  const deleteExperience = (id: string) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id),
    }));
  };

  const addEducation = (edu: Education) => {
    setResume(prev => ({ ...prev, education: [...prev.education, edu] }));
  };

  const updateEducation = (id: string, edu: Partial<Education>) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, ...edu } : e),
    }));
  };

  const deleteEducation = (id: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id),
    }));
  };

  const addSkill = (skill: Skill) => {
    setResume(prev => ({ ...prev, skills: [...prev.skills, skill] }));
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, ...skill } : s),
    }));
  };

  const deleteSkill = (id: string) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }));
  };

  const addProject = (project: Project) => {
    setResume(prev => ({ ...prev, projects: [...prev.projects, project] }));
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...project } : p),
    }));
  };

  const deleteProject = (id: string) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  };

  const setSummary = (summary: string) => {
    setResume(prev => ({ ...prev, summary }));
  };

  const setTargetJobTitle = (title: string) => {
    setResume(prev => ({ ...prev, targetJobTitle: title }));
  };

  const value: ResumeContextType = {
    resume,
    setPersonalInfo,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    setSummary,
    setTargetJobTitle,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
