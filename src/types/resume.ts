export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  jobTitle: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  bullets: string[];
  generatedBullets?: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationYear: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'tools';
}

export interface Project {
  id: string;
  name: string;
  techStack: string[];
  description: string;
  link: string;
  bullets: string[];
  generatedBullets?: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  summary: string;
  targetJobTitle?: string;
}

export interface AIRequest {
  type: 'experience' | 'project' | 'summary';
  data: Record<string, unknown>;
}

export interface AIResponse {
  content: Array<{ text: string }>;
  bullets?: string[];
  summary?: string;
  error?: string;
}
