"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Terminal, Code, Briefcase, GraduationCap, Cpu, Mail, Sun, Moon, Menu, X } from 'lucide-react';

const sections = [
  { id: 'about', title: 'About Me', icon: Terminal },
  { id: 'tech', title: 'Tech Stack', icon: Cpu },
  { id: 'education', title: 'Education', icon: GraduationCap },
  { id: 'experience', title: 'Work Experience', icon: Briefcase },
  { id: 'projects', title: 'Projects', icon: Code },
  { id: 'contact', title: 'Contact', icon: Mail },
];

const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayText('');
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return displayText;
};

const TerminalEmulator = ({ children, isDarkMode, onCommand }) => {
  const [command, setCommand] = useState('');
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onCommand(command);
      setCommand('');
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={`font-mono p-4 rounded-lg ${isDarkMode ? 'bg-black' : 'bg-gray-100'} overflow-hidden`}>
      <div className="flex space-x-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className={`${isDarkMode ? 'text-green-400' : 'text-gray-800'}`}>
        {children}
        <div className="mt-4 flex items-center">
          <span className="mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none flex-grow"
          />
        </div>
      </div>
    </div>
  );
};

const SkillBar = ({ skill, level, isDarkMode }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => setWidth(level), 100);
  }, [level]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span>{skill}</span>
        <span>{level}%</span>
      </div>
      <div className={`h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    setIsDarkMode(savedMode === null ? true : JSON.parse(savedMode));
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const handleCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    if (sections.some(section => section.id === lowerCommand)) {
      setActiveSection(lowerCommand);
    } else if (lowerCommand === 'help') {
      setActiveSection('help');
    } else {
      setActiveSection('error');
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'k':
          e.preventDefault();
          toggleDarkMode();
          break;
        case 'j':
          e.preventDefault();
          const currentIndex = sections.findIndex(section => section.id === activeSection);
          const nextIndex = (currentIndex + 1) % sections.length;
          setActiveSection(sections[nextIndex].id);
          break;
        default:
          break;
      }
    }
  }, [activeSection, toggleDarkMode]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return "Hello! I'm a passionate software developer with a love for clean code and efficient solutions. I specialize in building robust web applications and enjoy tackling complex problems.";
      case 'tech':
        return (
          <div>
            <p>Here are some of my top skills:</p>
            <SkillBar skill="JavaScript" level={90} isDarkMode={isDarkMode} />
            <SkillBar skill="React" level={85} isDarkMode={isDarkMode} />
            <SkillBar skill="Node.js" level={80} isDarkMode={isDarkMode} />
            <SkillBar skill="TypeScript" level={75} isDarkMode={isDarkMode} />
            <SkillBar skill="GraphQL" level={70} isDarkMode={isDarkMode} />
          </div>
        );
      case 'education':
        return "Education:\n\nBachelor of Science in Computer Science\nUniversity Name\nGraduation Year: 20XX\n\nRelevant Coursework:\n- Data Structures and Algorithms\n- Web Development\n- Database Management Systems";
      case 'experience':
        return "Work Experience:\n\nSenior Software Developer\nTech Solutions Inc., 20XX - Present\n- Led development of a high-traffic e-commerce platform\n- Implemented CI/CD pipelines, reducing deployment time by 50%\n\nJunior Developer\nStartup Innovations, 20XX - 20XX\n- Developed and maintained multiple client-facing web applications\n- Collaborated in an Agile team environment";
      case 'projects':
        return "Projects:\n\n1. AI-Powered Task Manager\n   - Developed a React Native app with ML-based task prioritization\n   - Integrated with GPT-3 for natural language processing\n\n2. Open-Source Contribution Tracker\n   - Created a Chrome extension to visualize GitHub contributions\n   - Used D3.js for data visualization";
      case 'contact':
        return "Contact:\n\nEmail: your.email@example.com\nLinkedIn: linkedin.com/in/yourprofile\nGitHub: github.com/yourusername\nPersonal Website: www.yourportfolio.com";
      case 'help':
        return "Available commands:\n\nabout - View About Me\ntech - View Tech Stack\neducation - View Education\nexperience - View Work Experience\nprojects - View Projects\ncontact - View Contact Information\n\nKeyboard shortcuts:\nCtrl/Cmd + K: Toggle dark mode\nCtrl/Cmd + J: Navigate to next section";
      case 'error':
        return "Command not recognized. Type 'help' for a list of available commands.";
      default:
        return "Select a section to view content.";
    }
  };

  const content = renderContent();
  const displayText = typeof content === 'string' ? useTypewriter(content) : content;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-100 text-gray-800'} p-4 font-mono transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Name - Software Developer</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full bg-gray-700 text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>
        <div className="flex flex-col md:flex-row">
          <nav className={`
            ${isMenuOpen ? 'block' : 'hidden'} 
            md:block 
            fixed md:static 
            top-0 left-0 
            w-64 md:w-1/4 
            h-full md:h-auto 
            ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
            md:bg-transparent 
            p-4 md:p-0 
            z-50 md:z-auto 
            transition-all duration-300 ease-in-out 
            transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:transform-none
          `}>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleSectionClick(section.id)}
                    className={`flex items-center space-x-2 w-full text-left p-2 rounded ${
                      activeSection === section.id
                        ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                        : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    } transition-colors duration-300`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span>{section.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <main className={`w-full md:w-3/4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded transition-colors duration-300`}>
            <TerminalEmulator isDarkMode={isDarkMode} onCommand={handleCommand}>
              <pre className="whitespace-pre-wrap">{displayText}</pre>
            </TerminalEmulator>
          </main>
        </div>
      </div>
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default LandingPage;