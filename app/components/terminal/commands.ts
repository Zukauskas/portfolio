import { getFileOrDirectory } from './fileSystem';
import { CommandResponse, LocalFile, DirectoryNode } from './types';

const generateHelpManPage = (): string[] => {
  return [
    "PORTFOLIO(1)                   User Commands                   PORTFOLIO(1)",
    "",
    "NAME",
    "       portfolio - interactive portfolio terminal",
    "",
    "SYNOPSIS",
    "       [command] [arguments]",
    "",
    "DESCRIPTION",
    "       This interactive terminal allows you to explore the",
    "       portfolio, skills, and projects.",
    "",
    "COMMANDS",
    "       about     Display information about the developer",
    "       skills    List the developer's technical skills",
    "       projects  Show a list of the developer's projects",
    "       contact   Display contact information",
    "       ls        List directory contents",
    "       cd        Change the current directory",
    "       cat       Display file contents",
    "       pwd       Print name of current/working directory",
    "       echo      Display a line of text",
    "       clear     Clear the terminal screen",
    "       help      Display this help information",
    "       ai-status Display the status of AI systems",
    "       matrix    Engage digital rain effect",
    "       manifesto Display the AI Whisperer's Creed",
    "",
    "EXAMPLES",
    "       skills",
    "              Lists the developer's technical skills.",
    "",
    "       cat about.txt",
    "              Displays the contents of the about.txt file.",
    "",
    "       cd projects",
    "              Changes the current directory to 'projects'.",
    "",
    "AUTHOR",
    "       Tautvydas Z (tautzuk@tutanota.com)",
    "",
    "COPYRIGHT",
    "       Copyright © 2024 Tautvydas Z. All rights reserved.",
    "",
    "SEE ALSO",
    "       https://zukauskas.dev",
    "",
    "Portfolio Terminal                  July 2024                   PORTFOLIO(1)"
  ];
};

export const processCommand = (cmd: string, currentDirectory: string[]): CommandResponse => {
  const [command, ...args] = cmd.split(' ');
  let output: string | string[] | null = null;
  let newDirectory = currentDirectory;
  let error: string | boolean = false;

  switch (command.toLowerCase()) {
    case 'help':
    case 'halp': // A little fun easter egg
      output = generateHelpManPage();
      break;
    case 'manifesto': // Alias for 'cat ai-manifesto.md'
      const manifestoFile = getFileOrDirectory(['home', 'guest', 'ai-manifesto.md']);
      if (manifestoFile && manifestoFile.type === 'file') {
        output = ['MARKDOWN', manifestoFile.content];
      } else {
        // This case should ideally not be reached if loadAllFiles works as expected
        output = 'AI Manifesto not found. Critical system file missing!';
        error = true;
      }
      break;
    case 'ai-status':
      output = [
        "AI System Status:",
        "---------------------------------",
        "Core Processors: All 1024 cores online",
        "Neural Network: ZPT-3 (Large) - Active",
        "Sentiment Analysis Unit: Positive Bias Detected",
        "Cognitive Filters: Engaged",
        "Whisperer Link: Stable",
        "System Integrity: 100%",
        "AI Readiness: Ready for advanced prompting.",
        "---------------------------------",
        "\"Speak, and I shall decode the digital echoes.\""
      ];
      break;
    case 'matrix':
      // Special command, will be handled by TerminalPortfolio.tsx
      output = { type: 'matrix_effect', message: "Initiating Matrix display..." };
      break;
    case 'about':
      const aboutFile = getFileOrDirectory(['home', 'guest', 'about.md']);
      if (aboutFile && aboutFile.type === 'file') {
        output = ['MARKDOWN', aboutFile.content];
      } else {
        output = 'File not found: about.md';
        error = true;
      }
      break;
    case 'skills':
      const skillsFile = getFileOrDirectory(['home', 'guest', 'skills.md']);
      if (skillsFile && skillsFile.type === 'file') {
        output = ['MARKDOWN', skillsFile.content];
      } else {
        output = 'File not found: skills.md';
        error = true;
      }
      break;
    case 'contact':
      const contactFile = getFileOrDirectory(['home', 'guest', 'contact.md']);
      if (contactFile && contactFile.type === 'file') {
        output = ['MARKDOWN', contactFile.content];
      } else {
        output = 'File not found: contact.md';
        error = true;
      }
      break;
    case 'projects':
      const projectsDir = getFileOrDirectory(['home', 'guest', 'projects']);
      if (projectsDir && projectsDir.type === 'directory') {
        let combinedProjectContent = '';
        for (const projectName in projectsDir.children) {
          const projectFile = getFileOrDirectory(['home', 'guest', 'projects', projectName]);
          if (projectFile && projectFile.type === 'file') {
            if (combinedProjectContent !== '') {
              combinedProjectContent += '\n\n---\n\n';
            }
            combinedProjectContent += projectFile.content;
          }
        }
        if (combinedProjectContent === '') {
          output = 'No projects found in the projects directory.';
          // error = true; // debatable if this is an error
        } else {
          output = ['MARKDOWN', combinedProjectContent];
        }
      } else {
        output = 'Projects directory not found.';
        error = true;
      }
      break;
    case 'ls':
      const dirNode: LocalFile | null = getFileOrDirectory(currentDirectory);
      if (dirNode && dirNode.type === 'directory') {
        const directory = dirNode as DirectoryNode;
        output = Object.keys(directory.children).join('\n');
        if (output === '') {
          // output = ''; // No need to set to empty string, handled by default null
        }
      } else {
        const pathString = currentDirectory.length > 0 ? currentDirectory.join('/') : '/';
        output = `ls: cannot access '${pathString}': Not a directory`;
        error = true;
      }
      break;
    case 'cd':
      if (args[0] === '..') {
        if (currentDirectory.length > 1) { // Ensure we are not at /home or /
          newDirectory = currentDirectory.slice(0, -1);
          // output = 'Directory changed'; // No output on successful cd
        } else {
          output = 'cd: already at root';
          error = true;
        }
      } else if (args[0]) {
        const newPath = [...currentDirectory, args[0]];
        const newDir = getFileOrDirectory(newPath);
        if (newDir && newDir.type === 'directory') {
          newDirectory = newPath;
          // output = 'Directory changed'; // No output on successful cd
        } else {
          output = `cd: ${args[0]}: No such file or directory`;
          error = true;
        }
      } else {
        // No argument for cd, usually means go to home directory.
        // For this terminal, let's consider it an implicit success or no-op if already home.
        // If currentDirectory is not ['home', 'guest'], then change to it.
        if (currentDirectory.join('/') !== 'home/guest') {
            newDirectory = ['home', 'guest'];
        }
        // output = 'Usage: cd <directory>'; // No output on successful cd to home
        // error = true; // Not an error
      }
      break;
      case 'cat':
        if (args[0]) {
          const filePath = [...currentDirectory, args[0]];
          const file = getFileOrDirectory(filePath);
          if (file && file.type === 'file') {
            output = ['MARKDOWN', file.content];
          } else {
            output = `cat: ${args[0]}: No such file or directory`;
            error = true;
          }
        } else {
          output = 'cat: missing operand';
          error = true;
        }
        break;
    case 'pwd':
      output = '/' + currentDirectory.join('/');
      break;
    case 'echo':
      output = args.join(' ');
      break;
    case 'clear':
      output = null; // Special case for clearing the screen
      break;
    default:
      output = `Command not found: ${command}. Type 'help' for available commands.`;
      error = true;
  }
  return { output, newDirectory, error };
};