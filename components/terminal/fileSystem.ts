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