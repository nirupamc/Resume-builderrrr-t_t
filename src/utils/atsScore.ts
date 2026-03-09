import type { ResumeData } from '../types/resume';

const COMMON_ATS_KEYWORDS = [
  'managed', 'improved', 'increased', 'developed', 'implemented',
  'designed', 'created', 'built', 'achieved', 'accomplished',
  'coordinated', 'collaborated', 'led', 'optimized', 'streamlined',
  'enhanced', 'reduced', 'generated', 'delivered', 'analyzed',
];

const TECHNICAL_KEYWORDS = [
  'javascript', 'typescript', 'react', 'node.js', 'python',
  'java', 'sql', 'api', 'rest', 'graphql', 'aws', 'azure',
  'kubernetes', 'docker', 'git', 'agile', 'scrum',
];

export const calculateATSScore = (resume: ResumeData): number => {
  let score = 0;

  // Personal Info: 20 points
  if (resume.personalInfo.fullName) score += 5;
  if (resume.personalInfo.email) score += 5;
  if (resume.personalInfo.phone) score += 5;
  if (resume.personalInfo.jobTitle) score += 5;

  // Work Experience: 25 points
  if (resume.experiences.length > 0) score += 10;
  const avgExpBullets = resume.experiences.reduce((sum, exp) => sum + exp.bullets.length, 0) / Math.max(1, resume.experiences.length);
  if (avgExpBullets >= 3) score += 15;

  // Education: 15 points
  if (resume.education.length > 0) score += 15;

  // Skills: 20 points
  if (resume.skills.length >= 5) score += 10;
  if (resume.skills.length >= 10) score += 10;

  // Projects: 10 points
  if (resume.projects.length > 0) score += 10;

  // Summary: 10 points
  if (resume.summary && resume.summary.length > 50) score += 10;

  return Math.min(100, score);
};

export const extractKeywords = (resume: ResumeData): string[] => {
  const keywords = new Set<string>();

  // Extract from all text fields
  const textFields = [
    resume.personalInfo.fullName,
    resume.personalInfo.jobTitle,
    resume.summary,
  ];

  const allBullets = [
    ...resume.experiences.flatMap(e => e.bullets),
    ...resume.projects.flatMap(p => p.bullets),
  ];

  const allText = [...textFields, ...allBullets].join(' ').toLowerCase();

  // Check for common keywords
  COMMON_ATS_KEYWORDS.forEach(keyword => {
    if (allText.includes(keyword)) {
      keywords.add(keyword);
    }
  });

  // Check for technical keywords
  TECHNICAL_KEYWORDS.forEach(keyword => {
    if (allText.includes(keyword)) {
      keywords.add(keyword);
    }
  });

  return Array.from(keywords);
};

export const getMissingKeywords = (resume: ResumeData, targetJobTitle?: string): string[] => {
  const existingKeywords = extractKeywords(resume);
  const missingKeywords: string[] = [];

  // Suggest keywords based on job title
  if (targetJobTitle) {
    const jobTitleLower = targetJobTitle.toLowerCase();

    // Map job titles to suggested keywords
    const keywordSuggestions: Record<string, string[]> = {
      'software engineer': ['developed', 'implemented', 'api', 'database', 'testing'],
      'product manager': ['roadmap', 'stakeholder', 'metrics', 'user research', 'agile'],
      'data analyst': ['sql', 'analytics', 'insights', 'visualization', 'data'],
      'ux designer': ['design', 'prototyping', 'user experience', 'figma', 'research'],
      'project manager': ['managed', 'timeline', 'budget', 'stakeholder', 'coordinated'],
    };

    Object.entries(keywordSuggestions).forEach(([role, keywords]) => {
      if (jobTitleLower.includes(role)) {
        keywords.forEach(keyword => {
          if (!existingKeywords.includes(keyword)) {
            missingKeywords.push(keyword);
          }
        });
      }
    });
  }

  return missingKeywords.slice(0, 5); // Return top 5 suggestions
};

export const validateATSFormat = (resume: ResumeData): string[] => {
  const warnings: string[] = [];

  if (!resume.personalInfo.fullName) warnings.push('Missing full name');
  if (!resume.personalInfo.email) warnings.push('Missing email address');
  if (!resume.personalInfo.phone) warnings.push('Missing phone number');
  if (resume.experiences.length === 0) warnings.push('No work experience added');
  if (resume.education.length === 0) warnings.push('No education added');
  if (resume.skills.length < 5) warnings.push('Consider adding more skills');
  if (!resume.summary) warnings.push('Professional summary is recommended');

  resume.experiences.forEach((exp, idx) => {
    if (exp.bullets.length === 0) {
      warnings.push(`Experience ${idx + 1}: Add at least 2-3 bullet points`);
    }
  });

  return warnings;
};
