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
  let output: string | string[] | null;
  let newDirectory = currentDirectory;

  switch (command.toLowerCase()) {
    case 'help':
      output = generateHelpManPage();
      break;
    case 'about':
      const aboutFile = getFileOrDirectory(['home', 'guest', 'about.md']);
      if (aboutFile && aboutFile.type === 'file') {
        output = ['MARKDOWN', aboutFile.content];
      } else {
        output = 'File not found: about.md';
      }
      break;
    case 'skills':
      const skillsFile = getFileOrDirectory(['home', 'guest', 'skills.md']);
      if (skillsFile && skillsFile.type === 'file') {
        output = ['MARKDOWN', skillsFile.content];
      } else {
        output = 'File not found: skills.md';
      }
      break;
    case 'contact':
      const contactFile = getFileOrDirectory(['home', 'guest', 'contact.md']);
      if (contactFile && contactFile.type === 'file') {
        output = ['MARKDOWN', contactFile.content];
      } else {
        output = 'File not found: contact.md';
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
        output = ['MARKDOWN', combinedProjectContent];
      } else {
        output = 'Projects directory not found.';
      }
      break;
    case 'ls':
      const dirNode: LocalFile | null = getFileOrDirectory(currentDirectory);
      if (dirNode && dirNode.type === 'directory') {
        // Now TypeScript knows dirNode is a DirectoryNode
        // and dirNode.children is { [key: string]: LocalFile }
        const directory = dirNode as DirectoryNode; // Explicit cast to DirectoryNode
        output = Object.keys(directory.children).join('\n');
        if (output === '') {
          output = ''; // Keep it empty if no files, so it prints nothing
        }
      } else {
        const pathString = currentDirectory.length > 0 ? currentDirectory.join('/') : '/';
        output = `ls: cannot access '${pathString}': Not a directory`;
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
            output = ['MARKDOWN', file.content];
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