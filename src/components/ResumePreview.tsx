import React from 'react';
import { useResume } from '../context/ResumeContext';

export const ResumePreview: React.FC = () => {
  const { resume } = useResume();

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: '24px', textAlign: 'center', borderBottom: '2px solid #ddd', paddingBottom: '24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>{resume.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '16px', color: '#555', marginBottom: '12px' }}>{resume.personalInfo.jobTitle || 'Your Job Title'}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', fontSize: '13px', color: '#666' }}>
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.phone && <span>•</span>}
          {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo.location && <span>•</span>}
          {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', fontSize: '13px', marginTop: '8px' }}>
          {resume.personalInfo.linkedin && (
            <a href={`https://${resume.personalInfo.linkedin}`} style={{ color: '#0066cc', textDecoration: 'underline' }}>
              LinkedIn
            </a>
          )}
          {resume.personalInfo.github && (
            <a href={`https://${resume.personalInfo.github}`} style={{ color: '#0066cc', textDecoration: 'underline' }}>
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', borderLeft: '3px solid #1a1a1a', paddingLeft: '12px', marginBottom: '12px' }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: '13px', color: '#444', lineHeight: '1.6' }}>{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experiences.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', borderLeft: '3px solid #1a1a1a', paddingLeft: '12px', marginBottom: '12px' }}>
            Work Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {resume.experiences.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontWeight: 'bold', color: '#1a1a1a' }}>{exp.role}</h3>
                    <p style={{ fontSize: '13px', color: '#666' }}>{exp.company}</p>
                  </div>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    {exp.startDate}
                    {exp.endDate && ` – ${exp.endDate}`}
                    {exp.currentlyWorking && ' – Present'}
                  </div>
                </div>
                {exp.bullets.length > 0 && (
                  <ul style={{ marginTop: '8px', marginLeft: '20px' }}>
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} style={{ fontSize: '13px', color: '#444', marginBottom: '4px' }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', borderLeft: '3px solid #1a1a1a', paddingLeft: '12px', marginBottom: '12px' }}>
            Projects
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {resume.projects.map((proj) => (
              <div key={proj.id}>
                <div>
                  <h3 style={{ fontWeight: 'bold', color: '#1a1a1a' }}>{proj.name}</h3>
                  {proj.techStack.length > 0 && (
                    <p style={{ fontSize: '13px', color: '#666' }}>{proj.techStack.join(' • ')}</p>
                  )}
                  {proj.link && (
                    <p style={{ fontSize: '13px' }}>
                      <a href={proj.link} style={{ color: '#0066cc', textDecoration: 'underline' }}>
                        {proj.link}
                      </a>
                    </p>
                  )}
                </div>
                {proj.bullets.length > 0 && (
                  <ul style={{ marginTop: '8px', marginLeft: '20px' }}>
                    {proj.bullets.map((bullet, idx) => (
                      <li key={idx} style={{ fontSize: '13px', color: '#444', marginBottom: '4px' }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', borderLeft: '3px solid #1a1a1a', paddingLeft: '12px', marginBottom: '12px' }}>
            Education
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontWeight: 'bold', color: '#1a1a1a' }}>{edu.degree}</h3>
                    <p style={{ fontSize: '13px', color: '#666' }}>{edu.institution}</p>
                    {edu.field && <p style={{ fontSize: '13px', color: '#666' }}>{edu.field}</p>}
                  </div>
                  {edu.graduationYear && <div style={{ fontSize: '13px', color: '#666' }}>{edu.graduationYear}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div>
          <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', borderLeft: '3px solid #1a1a1a', paddingLeft: '12px', marginBottom: '12px' }}>
            Skills
          </h2>
          {Object.entries({
            'Technical': resume.skills.filter(s => s.category === 'technical'),
            'Soft Skills': resume.skills.filter(s => s.category === 'soft'),
            'Tools': resume.skills.filter(s => s.category === 'tools'),
          }).map(([category, skills]) =>
            skills.length > 0 ? (
              <div key={category} style={{ display: 'flex', gap: '12px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 'bold', color: '#1a1a1a', minWidth: 'fit-content' }}>{category}:</span>
                <span style={{ color: '#444' }}>{skills.map(s => s.name).join(', ')}</span>
              </div>
            ) : null
          )}
        </div>
      )}
    </>
  );
};
