"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal } from 'lucide-react';
import { processCommand } from './commands';
import { BootMessage } from './types';
import { bootMessages } from './bootSequence';

const TerminalPortfolio: React.FC = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [currentBootMessage, setCurrentBootMessage] = useState(0);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [currentDirectory, setCurrentDirectory] = useState<string[]>(['home', 'guest']);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [flicker, setFlicker] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentBootMessage < bootMessages.length) {
      const timer = setTimeout(() => {
        setCurrentBootMessage(prev => prev + 1);
      }, 300);
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
      const { output: commandOutput, newDirectory } = processCommand(input, currentDirectory);
      setOutput(prev => [...prev, `guest@zukauskas.dev:${currentDirectory.join('/')}$ ${input}`, commandOutput]);
      setCommandHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
      setInput('');
      if (newDirectory) {
        setCurrentDirectory(newDirectory);
      }
      if (commandOutput === 'CLEAR') {
        setOutput([]);
      }
      playSound('execute');
    }
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

  const simulateCommand = (command: string) => {
    setInput(command);
    const { output: commandOutput, newDirectory } = processCommand(command, currentDirectory);
    setOutput(prev => [...prev, `guest@zukauskas.dev:${currentDirectory.join('/')}$ ${command}`, commandOutput]);
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    setInput('');
    if (newDirectory) {
      setCurrentDirectory(newDirectory);
    }
    if (commandOutput === 'CLEAR') {
      setOutput([]);
    }
    playSound('execute');
  };

  return (
    <div className="bg-black text-white font-mono h-screen flex flex-col relative">
      <div className="crt"></div>
      <div className="scan-lines"></div>
      <div className="flex-grow overflow-y-auto p-4">
        <div className={`terminal-content ${flicker ? 'flicker' : ''}`}>
          {!bootComplete ? (
            <div>
              {bootMessages.slice(0, currentBootMessage).map((msg: BootMessage) => (
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