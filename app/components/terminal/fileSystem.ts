import { Directory } from './types';

export const fileSystem: Directory = {
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
            'about.txt': { name: 'about.txt', type: 'file', content: 'I am a passionate developer with experience in web technologies and AI.' },
            'skills.txt': { name: 'skills.txt', type: 'file', content: 'JavaScript, TypeScript, React, Next.js, Node.js, Tailwind CSS' },
            'projects': {
              name: 'projects',
              type: 'directory',
              content: '',
              children: {} // This will be populated dynamically
            },
            'contact.txt': { name: 'contact.txt', type: 'file', content: 'Email: tautzuk@tutanota.com | GitHub: github.com/zukauskas' },
          }
        }
      }
    }
  }
};

export const getFileOrDirectory = (path: string[]): File | Directory | null => {
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

export async function loadProjectFiles() {
  const projectFiles = await import('../../projects/projectData.json');
  fileSystem.children.home.children.guest.children.projects.children = projectFiles;
}