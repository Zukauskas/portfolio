"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal } from 'lucide-react';

interface BootMessage {
    id: number;
    text: string;
    status?: 'OK' | 'FAIL';
}


interface File {
  name: string;
  content: string;
  type: 'file' | 'directory';
}

interface Directory extends File {
  children: { [name: string]: File | Directory };
}

const bootMessages: BootMessage[] = [
    { id: 1, text: "Initializing system", status: 'OK' },
    { id: 2, text: "Loading kernel", status: 'OK' },
    { id: 3, text: "Mounting root filesystem", status: 'OK' },
    { id: 4, text: "Starting system logger", status: 'OK' },
    { id: 5, text: "Starting device manager", status: 'OK' },
    { id: 6, text: "Initializing network interfaces", status: 'OK' },
    { id: 7, text: "Starting firewall", status: 'OK' },
    { id: 8, text: "Setting up user environment", status: 'OK' },
    { id: 9, text: "Starting SSH server", status: 'OK' },
    { id: 10, text: "Loading developer profile", status: 'OK' },
    { id: 11, text: "Initializing portfolio interface", status: 'OK' },
];


const fileSystem: Directory = {
  name: '/',
  type: 'directory',
  content: '',
  children: {
    'home': {
      name: 'home',
      type: 'directory',
      content: '',
      children: {
        'guest': {
          name: 'guest',
          type: 'directory',
          content: '',
          children: {
            'about.txt': { name: 'about.txt', type: 'file', content: 'I am a passionate developer with experience in web technologies.' },
            'skills.txt': { name: 'skills.txt', type: 'file', content: 'JavaScript, TypeScript, React, Next.js, Node.js, Tailwind CSS' },
            'projects': {
              name: 'projects',
              type: 'directory',
              content: '',
              children: {
                'project1.md': { name: 'project1.md', type: 'file', content: '# E-commerce Site\n\nA full-stack e-commerce solution built with React and Node.js.' },
                'project2.md': { name: 'project2.md', type: 'file', content: '# Weather App\n\nA real-time weather application using OpenWeatherMap API.' },
                'project3.md': { name: 'project3.md', type: 'file', content: '# Portfolio Terminal\n\nAn interactive terminal-style portfolio (you are here!).' },
              }
            },
            'contact.txt': { name: 'contact.txt', type: 'file', content: 'Email: developer@zukauskas.dev | GitHub: github.com/yourusername' },
          }
        }
      }
    }
  }
};

const TerminalPortfolio: React.FC = () => {
    const [bootComplete, setBootComplete] = useState(false);
    const [currentBootMessage, setCurrentBootMessage] = useState(0);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<string[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [flicker, setFlicker] = useState(false);
    const [currentDirectory, setCurrentDirectory] = useState<string[]>(['home', 'guest']);



    const inputRef = useRef<HTMLInputElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const outputEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currentBootMessage < bootMessages.length) {
            const timer = setTimeout(() => {
                setCurrentBootMessage(prev => prev + 1);
            }, 300); // Reduced delay for faster boot sequence
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setBootComplete(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [currentBootMessage]);

    useEffect(() => {
        const flickerInterval = setInterval(() => {
            setFlicker(true);
            setTimeout(() => setFlicker(false), 50);
        }, 5000 + Math.random() * 5000);

        return () => clearInterval(flickerInterval);
    }, []);

    useEffect(() => {
        outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [output]);

    useEffect(() => {
        if (bootComplete) {
            inputRef.current?.focus();
        }
    }, [bootComplete]);

    const simulateCommand = (command: string) => {
    setInput(command);
    processCommand(command);
    setInput('');
  };

    const playSound = useCallback((soundType: 'type' | 'execute') => {
        if (audioRef.current) {
            audioRef.current.src = soundType === 'type' ? '/type-sound.mp3' : '/type-sound.mp3';
            audioRef.current.play().catch(e => console.error("Error playing sound:", e));
        }
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        playSound('type');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            processCommand(input);
            setCommandHistory(prev => [...prev, input]);
            setHistoryIndex(-1);
            setInput('');
            playSound('execute');
        }
    };

    const getFileOrDirectory = (path: string[]): File | Directory | null => {
        let current: File | Directory = fileSystem;
        for (const segment of path) {
            if (current.type === 'directory' && segment in current.children) {
                current = current.children[segment];
            } else {
                return null;
            }
        }
        return current;
    };

    const processCommand = (cmd: string) => {
        const [command, ...args] = cmd.split(' ');
        let response: string;

        switch (command.toLowerCase()) {
            case 'help':
                response = 'Available commands: about, skills, projects, contact, ls, cd, cat, pwd, echo, clear';
                break;
            case 'about':
                response = getFileOrDirectory([...currentDirectory, 'about.txt'])?.content || 'File not found';
                break;
            case 'skills':
                response = getFileOrDirectory([...currentDirectory, 'skills.txt'])?.content || 'File not found';
                break;
            case 'projects':
                const projects = getFileOrDirectory([...currentDirectory, 'projects']);
                if (projects && projects.type === 'directory') {
                    response = Object.keys(projects.children).join('\n');
                } else {
                    response = 'Projects directory not found';
                }
                break;
            case 'contact':
                response = getFileOrDirectory([...currentDirectory, 'contact.txt'])?.content || 'File not found';
                break;
            case 'ls':
                const dir = getFileOrDirectory(currentDirectory);
                if (dir && dir.type === 'directory') {
                    response = Object.keys(dir.children).join('\n');
                } else {
                    response = 'Not a directory';
                }
                break;
            case 'cd':
                if (args[0] === '..') {
                    if (currentDirectory.length > 1) {
                        setCurrentDirectory(prev => prev.slice(0, -1));
                        response = 'Directory changed';
                    } else {
                        response = 'Already at root directory';
                    }
                } else if (args[0]) {
                    const newPath = [...currentDirectory, args[0]];
                    const newDir = getFileOrDirectory(newPath);
                    if (newDir && newDir.type === 'directory') {
                        setCurrentDirectory(newPath);
                        response = 'Directory changed';
                    } else {
                        response = 'Directory not found';
                    }
                } else {
                    response = 'Usage: cd <directory>';
                }
                break;
            case 'cat':
                if (args[0]) {
                    const file = getFileOrDirectory([...currentDirectory, args[0]]);
                    if (file && file.type === 'file') {
                        response = file.content;
                    } else {
                        response = 'File not found';
                    }
                } else {
                    response = 'Usage: cat <filename>';
                }
                break;
            case 'pwd':
                response = '/' + currentDirectory.join('/');
                break;
            case 'echo':
                response = args.join(' ');
                break;
            case 'clear':
                setOutput([]);
                return;
            default:
                response = `Command not found: ${command}. Type 'help' for available commands.`;
        }
        setOutput(prev => [...prev, `guest@zukauskas.dev:${currentDirectory.join('/')}$ ${cmd}`, response]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHistoryIndex(prev => {
                const newIndex = Math.min(prev + 1, commandHistory.length - 1);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
                return newIndex;
            });
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHistoryIndex(prev => {
                const newIndex = Math.max(prev - 1, -1);
                setInput(newIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - newIndex]);
                return newIndex;
            });
        }
    };

     return (
    <div className="bg-black text-white font-mono h-screen flex flex-col relative">
      <div className="crt"></div>
      <div className="scan-lines"></div>
      <div className="flex-grow overflow-y-auto p-4">
        <div className={`terminal-content ${flicker ? 'flicker' : ''}`}>
          {!bootComplete ? (
            <div>
              {bootMessages.slice(0, currentBootMessage).map((msg) => (
                <div key={msg.id} className="flex justify-between">
                  <span>{msg.text}</span>
                  {msg.status && (
                    <span>
                      [<span className={msg.status === 'OK' ? 'text-green-500' : 'text-red-500'}>
                        {msg.status}
                      </span>]
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-4">
                <div>Welcome to the Developer Portfolio Terminal</div>
                <div>Type &apos;help&apos; for available commands or use the navigation below.</div>
              </div>
              <div className="mb-4">
                {output.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
                <div ref={outputEndRef} />
              </div>
              <form onSubmit={handleSubmit} className="flex items-center">
                <Terminal size={20} className="mr-2" />
                <span className="mr-2">guest@zukauskas.dev:{currentDirectory.join('/')}$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent focus:outline-none flex-grow"
                  autoFocus
                />
              </form>
            </>
          )}
        </div>
      </div>
      {bootComplete && (
        <div className="flex justify-between border-t border-gray-700 p-2 bg-black">
          <button 
            onClick={() => simulateCommand('about')}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            About
          </button>
          <button 
            onClick={() => simulateCommand('skills')}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            Skills
          </button>
          <button 
            onClick={() => simulateCommand('projects')}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            Projects
          </button>
          <button 
            onClick={() => simulateCommand('contact')}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            Contact
          </button>
          <button 
            onClick={() => simulateCommand('help')}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            Help
          </button>
        </div>
      )}
      <audio ref={audioRef} />
    </div>
  );
};

export default TerminalPortfolio;