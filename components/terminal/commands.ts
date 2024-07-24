import { getFileOrDirectory } from './fileSystem';
import { CommandResponse, File, Directory } from './types';

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
    "       Copyright © 2023 Your Name. All rights reserved.",
    "",
    "SEE ALSO",
    "       https://zukauskas.dev",
    "",
    "Portfolio Terminal                  July 2023                   PORTFOLIO(1)"
  ];
};

export const processCommand = (cmd: string, currentDirectory: string[]): CommandResponse => {
  const [command, ...args] = cmd.split(' ');
  let output: string | string[] | null;
  let newDirectory = currentDirectory;

  switch (command.toLowerCase()) {
    case 'help':
      output = generateHelpManPage();
      break;
    case 'about':
      output = getFileOrDirectory([...currentDirectory, 'about.txt'])?.content || 'File not found';
      break;
    case 'skills':
      output = getFileOrDirectory([...currentDirectory, 'skills.txt'])?.content || 'File not found';
      break;
    case 'projects':
      const projects = getFileOrDirectory([...currentDirectory, 'projects']);
      if (projects && projects.type === 'directory') {
        output = Object.keys(projects.children).join('\n');
      } else {
        output = 'Projects directory not found';
      }
      break;
    case 'contact':
      output = getFileOrDirectory([...currentDirectory, 'contact.txt'])?.content || 'File not found';
      break;
    case 'ls':
      const dir = getFileOrDirectory(currentDirectory);
      if (dir && dir.type === 'directory') {
        output = Object.keys(dir.children).join('\n');
      } else {
        output = 'Not a directory';
      }
      break;
    case 'cd':
      if (args[0] === '..') {
        if (currentDirectory.length > 1) {
          newDirectory = currentDirectory.slice(0, -1);
          output = 'Directory changed';
        } else {
          output = 'Already at root directory';
        }
      } else if (args[0]) {
        const newPath = [...currentDirectory, args[0]];
        const newDir = getFileOrDirectory(newPath);
        if (newDir && newDir.type === 'directory') {
          newDirectory = newPath;
          output = 'Directory changed';
        } else {
          output = 'Directory not found';
        }
      } else {
        output = 'Usage: cd <directory>';
      }
      break;
    case 'cat':
      if (args[0]) {
        const file = getFileOrDirectory([...currentDirectory, args[0]]);
        if (file && file.type === 'file') {
          if (args[0].endsWith('.md')) {
            output = ['MARKDOWN', file.content];
          } else {
            output = file.content;
          }
        } else {
          output = 'File not found';
        }
      } else {
        output = 'Usage: cat <filename>';
      }
      break;
    case 'pwd':
      output = '/' + currentDirectory.join('/');
      break;
    case 'echo':
      output = args.join(' ');
      break;
    case 'clear':
      output = null;
      break;
    default:
      output = `Command not found: ${command}. Type 'help' for available commands.`;
  }

  return { output, newDirectory };
};