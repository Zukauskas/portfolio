'use client'
import React, { useState } from 'react';
import { Terminal, Code, Briefcase, GraduationCap, Cpu, Mail } from 'lucide-react';

const sections = [
  { id: 'about', title: 'About Me', icon: Terminal },
  { id: 'tech', title: 'Tech Stack', icon: Cpu },
  { id: 'education', title: 'Education', icon: GraduationCap },
  { id: 'experience', title: 'Work Experience', icon: Briefcase },
  { id: 'projects', title: 'Projects', icon: Code },
  { id: 'contact', title: 'Contact', icon: Mail },
];

const LandingPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">About Me</h2>
            <p>Hello! I&apos;m a passionate software developer with a love for clean code and efficient solutions.</p>
          </div>
        );
      case 'tech':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Tech Stack</h2>
            <ul className="list-disc list-inside">
              <li>TypeScript</li>
              <li>React / Next.js</li>
              <li>Node.js</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
        );
      case 'education':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Education</h2>
            <div>
              <h3 className="font-medium">Bachelor of Science in Computer Science</h3>
              <p>University Name, Graduation Year</p>
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Work Experience</h2>
            <div>
              <h3 className="font-medium">Software Developer</h3>
              <p>Company Name, Start Date - Present</p>
              <ul className="list-disc list-inside">
                <li>Developed and maintained web applications using React and Node.js</li>
                <li>Collaborated with cross-functional teams to deliver high-quality software solutions</li>
              </ul>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Projects</h2>
            <div>
              <h3 className="font-medium">Project Name</h3>
              <p>A brief description of the project and your role in it.</p>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p>Email: your.email@example.com</p>
            <p>LinkedIn: linkedin.com/in/yourprofile</p>
            <p>GitHub: github.com/yourusername</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-4 font-mono">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Tautvydas Žukauskas - Software Developer</h1>
        </header>
        <div className="flex">
          <nav className="w-1/4 pr-4">
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 w-full text-left p-2 rounded ${
                      activeSection === section.id ? 'bg-gray-800' : 'hover:bg-gray-800'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span>{section.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <main className="w-3/4 bg-gray-800 p-4 rounded">
            <div className="border-b border-green-400 pb-2 mb-4 flex items-center space-x-2">
              <span className="text-red-400">●</span>
              <span className="text-yellow-400">●</span>
              <span className="text-green-400">●</span>
              <span className="ml-2">{activeSection}.tsx</span>
            </div>
            <div className="space-y-4">{renderContent()}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;