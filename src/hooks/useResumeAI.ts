import { useState } from 'react';
import type { AIRequest, AIResponse } from '../types/resume';

interface UseResumeAIReturn {
  isLoading: boolean;
  error: string | null;
  generateExperienceBullets: (company: string, role: string, description: string) => Promise<string[]>;
  generateProjectBullets: (name: string, techStack: string[], description: string) => Promise<string[]>;
  generateSummary: (resumeData: unknown) => Promise<string>;
}

export const useResumeAI = (): UseResumeAIReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callClaudeAPI = async (request: AIRequest): Promise<AIResponse> => {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      throw new Error('Anthropic API key not configured. Please set VITE_ANTHROPIC_API_KEY in .env');
    }

    const systemPrompt = `You are an expert resume writer specializing in ATS-optimized resumes. Generate concise, impactful bullet points using strong action verbs and quantifiable achievements where possible. Return ONLY the bullet points, one per line, without numbering or additional formatting.`;

    let userPrompt = '';

    if (request.type === 'experience') {
      const { company, role, description } = request.data as { company: string; role: string; description: string };
      userPrompt = `Generate 4-5 ATS-optimized bullet points for this work experience:
Company: ${company}
Role: ${role}
Description: ${description}

Generate only the bullet points, each starting with a strong action verb.`;
    } else if (request.type === 'project') {
      const { name, techStack, description } = request.data as { name: string; techStack: string[]; description: string };
      userPrompt = `Generate 3-4 ATS-optimized bullet points for this project:
Project Name: ${name}
Tech Stack: ${techStack.join(', ')}
Description: ${description}

Generate only the bullet points, each starting with a strong action verb.`;
    } else if (request.type === 'summary') {
      const resumeData = request.data as Record<string, unknown>;
      userPrompt = `Based on the following resume data, generate a compelling professional summary (3-4 sentences):
${JSON.stringify(resumeData, null, 2)}

Make it ATS-friendly and engaging. Do not include bullets or numbering.`;
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to call Claude API');
    }

    const data = await response.json();
    return data;
  };

  const generateExperienceBullets = async (company: string, role: string, description: string): Promise<string[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await callClaudeAPI({
        type: 'experience',
        data: { company, role, description },
      });

      const content = response.content?.[0]?.text || '';
      const bullets = content
        .split('\n')
        .filter((line: string) => line.trim().length > 0)
        .map((line: string) => line.replace(/^[-•*]\s*/, '').trim());

      return bullets;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate bullets';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const generateProjectBullets = async (name: string, techStack: string[], description: string): Promise<string[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await callClaudeAPI({
        type: 'project',
        data: { name, techStack, description },
      });

      const content = response.content?.[0]?.text || '';
      const bullets = content
        .split('\n')
        .filter((line: string) => line.trim().length > 0)
        .map((line: string) => line.replace(/^[-•*]\s*/, '').trim());

      return bullets;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate bullets';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const generateSummary = async (resumeData: unknown): Promise<string> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await callClaudeAPI({
        type: 'summary',
        data: resumeData as Record<string, unknown>,
      });

      const summary = response.content?.[0]?.text || '';
      return summary;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate summary';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    generateExperienceBullets,
    generateProjectBullets,
    generateSummary,
  };
};
