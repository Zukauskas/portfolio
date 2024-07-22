import { getFileOrDirectory } from './fileSystem';
import { CommandResponse, File, Directory } from './types';

export const processCommand = (cmd: string, currentDirectory: string[]): CommandResponse => {
  const [command, ...args] = cmd.split(' ');
  let output: string;
  let newDirectory = currentDirectory;

  switch (command.toLowerCase()) {
    case 'help':
      output = 'Available commands: about, skills, projects, contact, ls, cd, cat, pwd, echo, clear';
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
          output = file.content;
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
      output = 'CLEAR';
      break;
    default:
      output = `Command not found: ${command}. Type 'help' for available commands.`;
  }

  return { output, newDirectory };
};