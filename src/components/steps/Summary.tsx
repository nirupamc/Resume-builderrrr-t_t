import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { useResumeAI } from '../../hooks/useResumeAI';
import { StepWrapper } from '../StepWrapper';
import { AIButton } from '../AIButton';

export const SummaryStep: React.FC = () => {
  const { resume, setSummary } = useResume();
  const { generateSummary, isLoading } = useResumeAI();
  const [jobTitle, setJobTitle] = useState(resume.targetJobTitle || '');

  const handleGenerateAI = async () => {
    try {
      const generatedSummary = await generateSummary({
        personalInfo: resume.personalInfo,
        experiences: resume.experiences,
        education: resume.education,
        skills: resume.skills,
        targetJobTitle: jobTitle,
      });

      setSummary(generatedSummary);
    } catch (error) {
      console.error('Failed to generate summary:', error);
    }
  };

  return (
    <StepWrapper>
      <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-text-primary mb-2">Professional Summary</h1>
          <p className="text-sm text-text-secondary">A concise overview of your professional background and career goals</p>
          <div className="h-1 w-24 bg-gradient-to-r from-accent to-accent-soft rounded-full mt-4"></div>
        </div>

        <div className="space-y-6">
          {/* Target Job Title */}
          <div>
            <label className="field-label">Target Job Title (Optional)</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="field-input"
              placeholder="e.g., Senior Software Engineer, Product Manager"
            />
            <p className="text-xs text-text-muted mt-2">Helps AI generate a more targeted summary</p>
          </div>

          {/* AI Button */}
          <div>
            <AIButton
              onClick={handleGenerateAI}
              isLoading={isLoading}
            />
          </div>

          {/* Summary Textarea */}
          <div>
            <label className="field-label">Your Summary</label>
            <textarea
              value={resume.summary}
              onChange={(e) => setSummary(e.target.value)}
              className="field-input resize-none"
              placeholder="Write or generate a professional summary. Make it 2-3 sentences highlighting your key strengths, achievements, and career goals."
              rows={5}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-text-muted">
                {resume.summary.length} characters • Aim for 150-300 characters for best ATS compatibility
              </p>
              {resume.summary.length >= 150 && resume.summary.length <= 300 && (
                <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">Perfect length</span>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
            <h3 className="font-serif font-semibold text-text-primary mb-3">Tips for a Great Summary</h3>
            <ul className="text-sm text-text-secondary space-y-2 list-disc list-inside">
              <li>Start with your current role or target position</li>
              <li>Highlight 2-3 key achievements or specialties</li>
              <li>Include relevant keywords for your industry</li>
              <li>Focus on impact: what problems you solve</li>
              <li>Use numbers and specific accomplishments when possible</li>
            </ul>
          </div>

          {/* Preview */}
          {resume.summary && (
            <div className="bg-bg-card border border-border rounded-lg p-6">
              <p className="text-xs uppercase font-semibold tracking-widest text-text-secondary mb-3">Preview</p>
              <p className="text-text-primary leading-relaxed">{resume.summary}</p>
            </div>
          )}
        </div>
      </div>
    </StepWrapper>
  );
};
