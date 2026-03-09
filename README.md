# ATS-Friendly Resume Builder

A modern, AI-powered resume builder that helps you create ATS-optimized resumes with real-time preview and PDF export. Uses Claude AI to generate polished, professional bullet points and summaries.

## ✨ Features

- **📋 Multi-Step Form** with sidebar progress indicator
- **🤖 AI-Powered Content Generation** using Claude Sonnet 4
- **📄 Live Resume Preview** with real-time formatting
- **✓ ATS Optimization** with scoring and keyword suggestions
- **📥 PDF Export** with professional formatting
- **📱 Responsive Design** for mobile and desktop
- **🎨 Beautiful UI** with Tailwind CSS
- **💾 Organized Sections** - Personal Info, Experience, Education, Skills, Projects, Summary

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API (claude-sonnet-4-20250514)
- **PDF Export**: html2pdf.js
- **Notifications**: React Toastify
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ (recommended: 20.19+)
- npm or yarn
- An Anthropic API key (get one at https://console.anthropic.com)

## 🚀 Getting Started

### 1. Clone and Install Dependencies

```bash
cd resume-builder
npm install
```

### 2. Set Up Your Anthropic API Key

1. Get your API key from https://console.anthropic.com/
2. Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

3. Edit `.env.local` and add your API key:

```
VITE_ANTHROPIC_API_KEY=sk-ant-your-actual-api-key-here
```

### 3. Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 📚 How to Use

### Building Your Resume

1. **Personal Info** - Enter your name, email, phone, and social profiles
2. **Work Experience** - Add your work history with AI-powered bullet point generation
3. **Education** - List your degrees and institutions
4. **Skills** - Add technical, soft, and tool skills organized by category
5. **Projects** - Showcase your best projects with AI-generated descriptions
6. **Summary** - Add or generate a professional summary

### AI-Powered Features

- **Generate Bullet Points**: Click the "✨ Generate with AI" button on any experience or project
- **Generate Summary**: Let AI create a compelling professional summary based on your data
- **ATS Score**: See your resume's ATS compatibility score (0-100)

### Export Your Resume

- **Download as PDF**: Click "Download PDF" to save your resume as a file
- **Copy to Clipboard**: Click "Copy" to copy formatted text

## 📁 Project Structure

```
src/
├── components/
│   ├── steps/
│   │   ├── PersonalInfo.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── Summary.tsx
│   ├── AIButton.tsx
│   ├── StepSidebar.tsx
│   └── ResumePreview.tsx
├── context/
│   └── ResumeContext.tsx
├── hooks/
│   └── useResumeAI.ts
├── types/
│   └── resume.ts
├── utils/
│   ├── atsScore.ts
│   └── pdfExport.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🔧 Available Scripts

### Development

```bash
npm run dev
```

Starts the development server with hot reload.

### Build for Production

```bash
npm run build
```

Builds the application for production to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Preview the production build locally.

### Lint

```bash
npm run lint
```

Run ESLint to check code quality.

## 🎯 ATS Optimization Features

### ATS Score

Your resume gets a score (0-100) based on:

- Completeness of sections
- Presence of bullet points
- Keyword density
- Proper formatting

### Suggestions

The app provides recommendations to improve your ATS compatibility:

- Add missing sections
- Include more bullet points
- Add relevant keywords
- Complete required fields

### Keywords

Search for common ATS keywords:

- Action verbs: "managed", "improved", "developed", "implemented"
- Technical terms relevant to your field
- Role-specific keywords

## 🤖 Claude API Integration

The app uses Claude Sonnet 4 to generate:

- **Experience bullets** with strong action verbs
- **Project descriptions** highlighting technical achievements
- **Professional summaries** tailored to your target role

All AI generation is performed in-browser with your API key. No data is stored on our servers.

## 🎨 Customization

### Colors

Update colors in `tailwind.config.js`:

- Navy (primary): `#001f3f`
- Gold (accent): `ffc107`
- Green (success): `#10b981`

### Fonts

Tailwind CSS uses system fonts by default. To customize, update `tailwind.config.js`.

## 📱 Responsive Design

- **Desktop**: Two-panel layout (form on left, preview on right)
- **Mobile/Tablet**: Tab view switching between form and preview

## ⚠️ Important Notes

1. **API Key Security**: Never commit your `.env.local` file. It's in `.gitignore` by default.
2. **Browser Storage**: All resume data is stored in browser state. Consider saving before page refresh.
3. **PDF Export**: Works best in Chrome/Edge. May have minor formatting differences in other browsers.
4. **API Costs**: Each AI generation call uses Claude API credits. Check usage in your Anthropic dashboard.

## 🐛 Troubleshooting

### "API key not configured" error

- Ensure `.env.local` exists in the project root
- Check that `VITE_ANTHROPIC_API_KEY` is set correctly
- Restart the dev server after updating `.env.local`

### AI generation is slow

- Check your internet connection
- Verify your API key is valid
- Check Anthropic API status at status.anthropic.com

### PDF export looks different

- Use Chrome or Edge for best results
- Ensure all content is filled out before exporting
- The preview panel should match the PDF closely

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Contributing

To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🔗 Resources

- [Anthropic API Documentation](https://docs.anthropic.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Vite Documentation](https://vite.dev)

## ❓ FAQs

**Q: Can I use this offline?**
A: No, AI generation requires an API connection to Anthropic.

**Q: How long does my resume stay saved?**
A: Your resume is stored in browser state. It will be lost on page refresh. Consider exporting to PDF.

**Q: Can I import from another resume?**
A: Currently not supported, but you can manually copy/paste content.

**Q: Is there a maximum resume length?**
A: No hard limit, but keep it concise (1-2 pages recommended).

**Q: Can I customize the resume template?**
A: Yes, modify `ResumePreview.tsx` to change the template design.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
