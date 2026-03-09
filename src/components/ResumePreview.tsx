import React from 'react';
import { useResume } from '../context/ResumeContext';

// Section Header Component
const SectionHeader = ({ title }: { title: string }) => (
  <div style={{ marginBottom: '8px' }}>
    <h2 style={{
      fontSize: '13px',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#111',
      margin: '0 0 4px',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {title}
    </h2>
    <hr style={{ border: 'none', borderTop: '1.5px solid #ddd', margin: 0 }} />
  </div>
);

export const ResumePreview: React.FC = () => {
  const { resume } = useResume();

  // Group skills by category
  const skillsByCategory = resume.skills.reduce((acc, skill) => {
    const category = skill.category || 'Technical Skills';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <>
      {/* ── HEADER SECTION ── */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: '800',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: '#111',
          margin: '0 0 6px',
          fontFamily: "'DM Sans', sans-serif"
        }}>
          {resume.personalInfo.fullName || 'Your Name'}
        </h1>

        <p style={{ fontSize: '13px', color: '#444', margin: '0 0 4px', fontWeight: 500 }}>
          {resume.personalInfo.jobTitle || 'Your Job Title'}
        </p>

        {/* Contact info row — only show filled fields */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '6px',
          fontSize: '12px',
          color: '#555',
          marginTop: '8px'
        }}>
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.email && resume.personalInfo.phone && <span style={{ color: '#ccc' }}>|</span>}
          {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo.location && (
            <>
              <span style={{ color: '#ccc' }}>|</span>
              <span>{resume.personalInfo.location}</span>
            </>
          )}
          {resume.personalInfo.linkedin && (
            <>
              <span style={{ color: '#ccc' }}>|</span>
              <span>{resume.personalInfo.linkedin}</span>
            </>
          )}
          {resume.personalInfo.github && (
            <>
              <span style={{ color: '#ccc' }}>|</span>
              <span>{resume.personalInfo.github}</span>
            </>
          )}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <hr style={{ border: 'none', borderTop: '2px solid #111', margin: '0 0 16px' }} />

      {/* ── PROFESSIONAL SUMMARY ── */}
      {resume.summary && (
        <section style={{ marginBottom: '18px' }}>
          <SectionHeader title="Professional Summary" />
          <p style={{ fontSize: '12.5px', lineHeight: '1.65', color: '#333', margin: 0 }}>
            {resume.summary}
          </p>
        </section>
      )}

      {/* ── TECHNICAL SKILLS ── */}
      {resume.skills && resume.skills.length > 0 && (
        <section style={{ marginBottom: '18px' }}>
          <SectionHeader title="Technical Skills" />
          <div style={{ fontSize: '12.5px', lineHeight: '1.7', color: '#333' }}>
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category} style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: '700', color: '#111' }}>
                  {category}:{' '}
                </span>
                <span>{skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── WORK EXPERIENCE ── */}
      {resume.experiences && resume.experiences.length > 0 && (
        <section style={{ marginBottom: '18px' }}>
          <SectionHeader title="Work Experience" />
          {resume.experiences.map((job) => (
            <div key={job.id} style={{ marginBottom: '14px' }}>
              {/* Job header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                <div>
                  <span style={{ fontWeight: '700', fontSize: '13px', color: '#111' }}>
                    {job.role}
                  </span>
                  {job.company && (
                    <span style={{ fontSize: '12.5px', color: '#444' }}>
                      {' '}— {job.company}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '11.5px', color: '#666', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {job.startDate}{job.endDate ? ` – ${job.endDate}` : job.currentlyWorking ? ' – Present' : ''}
                </span>
              </div>

              {/* Bullet points */}
              {job.bullets && job.bullets.length > 0 && (
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px' }}>
                  {job.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: '12px',
                        lineHeight: '1.6',
                        color: '#333',
                        marginBottom: '2px'
                      }}
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ── EDUCATION ── */}
      {resume.education && resume.education.length > 0 && (
        <section style={{ marginBottom: '18px' }}>
          <SectionHeader title="Education" />
          {resume.education.map((edu) => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div>
                <span style={{ fontWeight: '700', fontSize: '13px', color: '#111' }}>
                  {edu.degree}
                </span>
                {edu.field && (
                  <span style={{ fontSize: '12.5px', color: '#444' }}>
                    {' '}in {edu.field}
                  </span>
                )}
                {edu.institution && (
                  <p style={{ fontSize: '12px', color: '#555', margin: '1px 0 0' }}>
                    {edu.institution}
                  </p>
                )}
              </div>
              {edu.graduationYear && (
                <span style={{ fontSize: '11.5px', color: '#666', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {edu.graduationYear}
                </span>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ── PROJECTS ── */}
      {resume.projects && resume.projects.length > 0 && (
        <section style={{ marginBottom: '18px' }}>
          <SectionHeader title="Projects" />
          {resume.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontWeight: '700', fontSize: '13px', color: '#111' }}>
                  {proj.name}
                </span>
                {proj.link && (
                  <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {proj.link}
                  </span>
                )}
              </div>
              {proj.techStack && proj.techStack.length > 0 && (
                <p style={{ fontSize: '11.5px', color: '#555', margin: '2px 0 4px', fontStyle: 'italic' }}>
                  {proj.techStack.join(', ')}
                </p>
              )}
              {proj.bullets && proj.bullets.length > 0 && (
                <ul style={{ margin: '0', paddingLeft: '18px' }}>
                  {proj.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: '12px',
                        lineHeight: '1.6',
                        color: '#333',
                        marginBottom: '2px'
                      }}
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
    </>
  );
};
