import { useState } from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { ResumePreview } from './components/ResumePreview';
import { PersonalInfoStep } from './components/steps/PersonalInfo';
import { ExperienceStep } from './components/steps/Experience';
import { EducationStep } from './components/steps/Education';
import { SkillsStep } from './components/steps/Skills';
import { ProjectsStep } from './components/steps/Projects';
import { SummaryStep } from './components/steps/Summary';
import { calculateATSScore } from './utils/atsScore';
import { exportResumePDF } from './utils/pdfExport';
import toast from 'react-hot-toast';

const steps = [
  { component: PersonalInfoStep, id: 0, label: 'Personal Info' },
  { component: ExperienceStep, id: 1, label: 'Experience' },
  { component: EducationStep, id: 2, label: 'Education' },
  { component: SkillsStep, id: 3, label: 'Skills' },
  { component: ProjectsStep, id: 4, label: 'Projects' },
  { component: SummaryStep, id: 5, label: 'Summary' },
];

function AppContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const { resume } = useResume();
  const atsScore = calculateATSScore(resume);

  const CurrentStepComponent = steps[currentStep].component;
  const stepTitle = steps[currentStep].label;

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Excellent';
    if (score >= 50) return 'Good';
    return 'Needs Work';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 70) return 'Your resume is ATS-friendly!';
    if (score >= 50) return 'Good progress. Add more details.';
    return 'Complete all sections for best results.';
  };

  const handleExportPDF = () => {
    const content = document.getElementById('resume-preview-content');
    if (content) {
      const htmlContent = content.innerHTML;
      exportResumePDF(resume, htmlContent);
      toast.success('Resume exported as PDF!');
    }
  };

  const handleCopyResume = async () => {
    const content = document.getElementById('resume-preview-content');
    if (content) {
      const text = content.innerText;
      try {
        await navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
      } catch {
        toast.error('Failed to copy');
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: '#0d0d0d',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* LEFT PANEL - Form */}
      <div style={{
        width: '50%',
        height: '100vh',
        overflowY: 'auto',
        background: '#141414',
        borderRight: '1px solid #222',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header - Slim top bar */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #222',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            color: '#c9a96e',
            fontSize: '20px'
          }}>resumé.</span>

          <span style={{ color: '#9a9088', fontSize: '13px' }}>Step {currentStep + 1} of 6</span>

          <button onClick={handleExportPDF} style={{
            background: 'transparent',
            border: '1px solid #c9a96e',
            color: '#c9a96e',
            borderRadius: '8px',
            padding: '6px 14px',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>Export PDF</button>
        </div>

        {/* Step Tabs - Horizontal scrollable */}
        <div style={{
          display: 'flex',
          gap: '6px',
          padding: '14px 24px',
          overflowX: 'auto',
          borderBottom: '1px solid #1e1e1e',
          flexShrink: 0,
          scrollbarWidth: 'none'
        }}>
          {steps.map((step, i) => (
            <button key={i} onClick={() => setCurrentStep(i)} style={{
              flexShrink: 0,
              padding: '7px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 500,
              border: currentStep === i ? '1px solid #c9a96e' : '1px solid #2a2a2a',
              background: currentStep === i ? 'rgba(201,169,110,0.12)' : '#1a1a1a',
              color: currentStep === i ? '#c9a96e' : '#6b6560',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}>{step.label}</button>
          ))}
        </div>

        {/* Form Content Area - Scrollable */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '28px 24px'
        }}>
          {/* Step title */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '26px',
            color: '#f0ece4',
            margin: '0 0 6px'
          }}>{stepTitle}</h2>
          <p style={{ color: '#5a5550', fontSize: '13px', margin: '0 0 28px' }}>
            Step {currentStep + 1} of 6
          </p>

          {/* Render current step form - ONCE */}
          <CurrentStepComponent />

          {/* Navigation */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px', paddingBottom: '40px' }}>
            <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} style={{
              padding: '10px 22px',
              borderRadius: '10px',
              border: '1px solid #2a2a2a',
              background: currentStep === 0 ? '#0a0a0a' : 'transparent',
              color: currentStep === 0 ? '#3d3830' : '#9a9088',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              flex: 1,
              transition: 'all 0.2s ease'
            }}>← Previous</button>

            <button onClick={() => setCurrentStep(Math.min(5, currentStep + 1))} disabled={currentStep === 5} style={{
              padding: '10px 22px',
              borderRadius: '10px',
              border: 'none',
              background: currentStep === 5 ? '#5a5035' : 'linear-gradient(135deg, #c9a96e, #8b6914)',
              color: '#0d0d0d',
              cursor: currentStep === 5 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              flex: 1,
              transition: 'all 0.2s ease'
            }}>Next →</button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Preview */}
      <div style={{
        width: '50%',
        height: '100vh',
        overflowY: 'auto',
        background: '#0d0d0d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 24px',
        gap: '20px'
      }}>
        {/* ATS Score Card */}
        <div style={{
          width: '100%',
          maxWidth: '660px',
          background: '#1a1a1a',
          border: '1px solid #222',
          borderRadius: '14px',
          padding: '18px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          flexShrink: 0
        }}>
          {/* Small compact SVG ring */}
          <svg width="72" height="72" viewBox="0 0 72 72" style={{ flexShrink: 0 }}>
            <circle cx="36" cy="36" r="28" fill="none" stroke="#2a2a2a" strokeWidth="6" />
            <circle
              cx="36" cy="36" r="28" fill="none"
              stroke={atsScore >= 70 ? '#4ade80' : atsScore >= 40 ? '#fbbf24' : '#f87171'}
              strokeWidth="6"
              strokeDasharray={`${(atsScore / 100) * 175.9} 175.9`}
              strokeLinecap="round"
              transform="rotate(-90 36 36)"
              style={{ transition: 'stroke-dasharray 0.8s ease' }}
            />
            <text x="36" y="41" textAnchor="middle" fill="#f0ece4" fontSize="15" fontWeight="700">
              {atsScore}
            </text>
          </svg>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#6b6560', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px', fontWeight: 600 }}>
              ATS Score
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#f0ece4', marginBottom: '6px' }}>
              {getScoreLabel(atsScore)}
            </div>
            <div style={{ fontSize: '12px', color: '#5a5550' }}>{getScoreMessage(atsScore)}</div>
          </div>

          <button onClick={handleCopyResume} style={{
            flexShrink: 0,
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #2a2a2a',
            background: 'transparent',
            color: '#9a9088',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>Copy</button>
        </div>

        {/* Resume Preview Paper Card */}
        <div style={{
          width: '100%',
          maxWidth: '660px',
          background: '#ffffff',
          borderRadius: '4px',
          padding: '52px 56px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          color: '#1a1a1a',
          fontFamily: "'DM Sans', sans-serif",
          minHeight: '800px',
          flexShrink: 0
        }}>
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}

export default App;
