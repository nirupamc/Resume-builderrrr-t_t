import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

export const PersonalInfoStep: React.FC = () => {
  const { resume, setPersonalInfo } = useResume();
  const [formData, setFormData] = useState(resume.personalInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = () => {
    setPersonalInfo(formData);
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <h1 className="text-4xl font-serif font-semibold text-text-primary mb-2">
          Personal Info
        </h1>
        <div className="w-10 h-1 bg-gradient-to-r from-accent to-accent-soft rounded-full" />
        <div className="absolute top-4 right-0 text-9xl font-serif text-accent opacity-5 select-none">01</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="field-group">
          <label className="field-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="field-input"
            placeholder="John Doe"
          />
        </div>

        <div className="field-group">
          <label className="field-label">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            className="field-input"
            placeholder="Senior Software Engineer"
          />
        </div>

        <div className="field-group">
          <label className="field-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="field-input"
            placeholder="john@example.com"
          />
        </div>

        <div className="field-group">
          <label className="field-label">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="field-input"
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="field-group">
          <label className="field-label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            onBlur={handleBlur}
            className="field-input"
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="field-group">
          <label className="field-label">LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            onBlur={handleBlur}
            className="field-input"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>

        <div className="md:col-span-2">
          <div className="field-group">
            <label className="field-label">GitHub</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              onBlur={handleBlur}
              className="field-input"
              placeholder="github.com/johndoe"
            />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
        <p className="text-sm text-text-secondary">
          💡 <span className="text-text-primary font-medium">Tip:</span> All fields marked with * are required for ATS compatibility.
        </p>
      </div>
    </div>
  );
};

