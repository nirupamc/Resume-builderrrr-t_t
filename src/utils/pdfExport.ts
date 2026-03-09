import html2pdf from 'html2pdf.js';
import type { ResumeData } from '../types/resume';

export const exportResumePDF = (resume: ResumeData, templateContent: string) => {
  const element = document.createElement('div');
  element.innerHTML = templateContent;

  const filename = `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;

  const options = {
    margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
    filename,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  html2pdf().set(options).from(element).save();
};

export const copyToClipboard = (text: string): Promise<boolean> => {
  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch(() => false);
};
