"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal } from 'lucide-react';

interface BootMessage {
  id: number;
  text: string;
}

const bootMessages: BootMessage[] = [
  { id: 1, text: "Initializing system..." },
  { id: 2, text: "Loading kernel..." },
  { id: 3, text: "Mounting file systems..." },
  { id: 4, text: "Starting network services..." },
  { id: 5, text: "Loading developer profile..." },
];

const TerminalPortfolio: React.FC = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [flicker, setFlicker] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootComplete(true);
      setOutput(bootMessages.map(msg => msg.text));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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

  const playSound = useCallback((soundType: 'type' | 'execute') => {
    if (audioRef.current) {
      audioRef.current.src = soundType === 'type' ? '/type-sound.mp3' : '/execute-sound.mp3';
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

  const processCommand = (cmd: string) => {
    let response: string;
    switch (cmd.toLowerCase()) {
      case 'help':
        response = 'Available commands: about, skills, projects, contact';
        break;
      case 'about':
        response = 'I am a passionate developer with experience in web technologies.';
        break;
      case 'skills':
        response = 'JavaScript, TypeScript, React, Next.js, Node.js, Tailwind CSS';
        break;
      case 'projects':
        response = 'Project 1: E-commerce site, Project 2: Weather app, Project 3: This portfolio';
        break;
      case 'contact':
        response = 'Email: developer@example.com | GitHub: github.com/developer';
        break;
      default:
        response = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
    setOutput(prev => [...prev, `$ ${cmd}`, response]);
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
    <div className={`bg-black text-green-500 p-4 font-mono h-screen overflow-y-auto relative ${flicker ? 'flicker' : ''}`}>
      <div className="crt"></div>
      <div className="scan-lines"></div>
      <div className="terminal-content">
        <div className="mb-4">
          {output.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
          <div ref={outputEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex items-center">
          <Terminal size={20} className="mr-2" />
          <span className="mr-2">$</span>
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
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default TerminalPortfolio;