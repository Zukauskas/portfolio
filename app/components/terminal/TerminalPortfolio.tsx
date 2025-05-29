"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal } from 'lucide-react';
import { processCommand } from './commands';
import { BootMessage } from './types';
import { bootMessages } from './bootSequence';
import ReactMarkdown from 'react-markdown';
import GUIPortfolio from '../gui-portfolio/GUIPortfolio';
import MatrixEffect from './MatrixEffect'; // Import MatrixEffect
import { loadAllFiles } from './fileSystem';


const TerminalPortfolio: React.FC = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [currentBootMessage, setCurrentBootMessage] = useState(0);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<(string | string[] | Record<string, any>)[]>([]) // Output can now include special objects
  const [currentDirectory, setCurrentDirectory] = useState<string[]>(['home', 'guest']);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [flicker, setFlicker] = useState(false);
  const [interfaceChoice, setInterfaceChoice] = useState<'terminal' | 'gui' | null>(null);
  const [showMatrixEffect, setShowMatrixEffect] = useState(false); // State for Matrix effect

  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

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
    if (bootComplete && interfaceChoice === 'terminal') {
      inputRef.current?.focus();
    }
  }, [bootComplete, interfaceChoice]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (terminalRef.current && terminalRef.current.contains(e.target as Node)) {
        inputRef.current?.focus();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const initializeTerminal = async () => {
      await loadAllFiles();
      setOutput([
        'Welcome to the Developer Portfolio Terminal',
        'Type \'help\' for available commands or use the navigation below.',
        'Type \'startx\' to switch to the GUI interface.'
      ]);
    };

    initializeTerminal();
  }, []);

  const playSound = useCallback((soundType: 'type' | 'execute' | 'error') => {
    if (audioRef.current) {
      let soundSrc = '/type-sound.mp3'; // Default
      if (soundType === 'execute') {
        soundSrc = '/execute-sound.mp3'; // Assumed new sound file
      } else if (soundType === 'error') {
        soundSrc = '/error-sound.mp3'; // Assumed new sound file
      }
      audioRef.current.src = soundSrc;
      audioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    playSound('type');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const commandToProcess = input.trim(); // Define once

    if (commandToProcess) {
      // Add command to output and history only once
      setOutput(prev => [...prev, `guest@zukauskas.dev:${currentDirectory.join('/')}$ ${commandToProcess}`]);
      setCommandHistory(prev => [...prev, commandToProcess]);

      if (commandToProcess.toLowerCase() === 'startx') {
        setOutput(prev => [...prev, "Starting GUI interface..."]);
          playSound('execute');
          setTimeout(() => {
            setInterfaceChoice('gui');
          }, 1000);
        } else {
          const { output: commandOutput, newDirectory, error } = processCommand(commandToProcess, currentDirectory);

          if (typeof commandOutput === 'object' && commandOutput !== null && 'type' in commandOutput && commandOutput.type === 'matrix_effect') {
            // Handle matrix effect command
            if (commandOutput.message) {
              setOutput(prev => [...prev, commandOutput.message as string]);
            }
            playSound('execute');
            // Delay showing matrix to allow message to render if any
            setTimeout(() => {
              setShowMatrixEffect(true); 
            }, 500);
          } else if (commandOutput === null) {
            setOutput([]); // Clear screen for 'clear' command
            playSound('execute'); // Typically clear doesn't have a sound, but can keep for consistency
          } else {
            setOutput(prev => [...prev, commandOutput as string | string[]]);
            if (error) {
              playSound('error');
            } else {
              playSound('execute');
            }
          }

          if (newDirectory) {
            setCurrentDirectory(newDirectory);
          }
        }
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };
  
  const handleMatrixComplete = () => {
    setShowMatrixEffect(false);
    setOutput(prev => [...prev, "Matrix effect terminated. Welcome back."]); // Optional message
    inputRef.current?.focus(); // Refocus on input
    setInput('');
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
    }
  };

  const handleTabCompletion = () => {
    const commands = ['help', 'about', 'skills', 'projects', 'contact', 'clear', 'startx']; // Add all your commands here
    const inputParts = input.split(' ');
    const lastWord = inputParts[inputParts.length - 1].toLowerCase();

    const matchingCommands = commands.filter(cmd => cmd.startsWith(lastWord));

    if (matchingCommands.length === 1) {
      // If there's only one matching command, complete it
      inputParts[inputParts.length - 1] = matchingCommands[0];
      setInput(inputParts.join(' '));
    } else if (matchingCommands.length > 1) {
      // If there are multiple matching commands, show them as suggestions
      setOutput(prev => [...prev, '', ...matchingCommands]);
    }
  };

  const handleInterfaceChoice = (choice: 'terminal' | 'gui') => {
    setInterfaceChoice(choice);
  };

  if (!bootComplete) {
    return (
      <div className="bg-black text-green-500 font-vt323 h-screen flex flex-col relative">
        <div className="crt"></div>
        <div className="scan-lines"></div>
        <div className="flex-grow overflow-y-auto p-4">
          <div className={`terminal-content ${flicker ? 'flicker' : ''}`}>
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
        </div>
      </div>
    );
  }

  if (bootComplete && interfaceChoice === null) {
    return (
      <div className="bg-black text-green-500 font-vt323 h-screen flex flex-col items-center justify-center relative">
        <div className="crt"></div>
        <div className="scan-lines"></div>
        <h1 className="text-2xl mb-8">Choose Your Interface</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => handleInterfaceChoice('terminal')}
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded font-sans" // Use sans for buttons
          >
            Terminal
          </button>
          <button
            onClick={() => handleInterfaceChoice('gui')}
            className="bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded font-sans" // Use sans for buttons
          >
            GUI
          </button>
        </div>
      </div>
    );
  }

  const handleSwitchToTerminal = () => {
    setInterfaceChoice('terminal');
    setInput('');
    setOutput(prev => [...prev, "GUI interface closed. Welcome back to the terminal."]);
  };

  if (interfaceChoice === 'gui') {
    return <GUIPortfolio onSwitchToTerminal={handleSwitchToTerminal} />;
  }
  // Render the terminal interface
  if (showMatrixEffect) {
    return <MatrixEffect onComplete={handleMatrixComplete} duration={10000} />; // Show Matrix effect
  }

  return (
    <div
      ref={terminalRef}
      className="bg-black text-green-500 font-vt323 h-screen flex flex-col relative" // Applied VT323 and colors
      onClick={() => inputRef.current?.focus()} // Focus on click anywhere in terminal
    >
      <div className="crt"></div>
      <div className="scan-lines"></div>
      <div className="flex-grow overflow-y-auto p-4">
        <div className={`terminal-content ${flicker ? 'flicker' : ''}`}>
          {output.map((line, index) => (
            <div key={index}>
              {typeof line === 'object' && line !== null && 'type' in line && line.type === 'matrix_effect' ? (
                <span className="text-accent">{line.message as string}</span> // Display matrix intro message
              ) : Array.isArray(line) && line[0] === 'MARKDOWN' ? (
                <ReactMarkdown className="markdown prose prose-invert">{line[1]}</ReactMarkdown>
              ) : Array.isArray(line) ? (
                <pre className="whitespace-pre-wrap font-vt323 text-sm"> {/* Ensure pre also uses vt323 */}
                  {line.join('\n')}
                </pre>
              ) : (
                line
              )}
            </div>
          ))}
          <div ref={outputEndRef} />
          <form onSubmit={handleSubmit} className="flex items-center">
            <Terminal size={20} className="mr-2 text-accent" /> 
            <span className="mr-2 text-accent">guest@zukauskas.dev:{currentDirectory.join('/')}$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInput} // Keep this one
              onKeyDown={handleKeyDown} // Keep this one
              className="bg-transparent text-green-500 focus:outline-none flex-grow" // Combined classes
              autoFocus
            />
          </form>
        </div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default TerminalPortfolio;