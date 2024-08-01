import { localFile } from './types';

export const fileSystem: localFile = {
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
            'about.md': { name: 'about.md', type: 'file', content: '' },
            'skills.md': { name: 'skills.md', type: 'file', content: '' },
            'contact.md': { name: 'contact.md', type: 'file', content: '' }, // Note: it's 'contact.md', not 'contacts.md'
            'projects': {
              name: 'projects',
              type: 'directory',
              content: '',
              children: {} // This will be populated dynamically
            }
          }
        }
      }
    }
  }
};

export const getFileOrDirectory = (path: string[]): localFile | null => {
  let current: localFile = fileSystem;
  for (const segment of path) {
    if (current.type === 'directory' && current.children && segment in current.children) {
      current = current.children[segment];
    } else {
      return null;
    }
  }
  return current;
};

export async function loadAllFiles() {
  try {
    const projectFiles = await import('../../projects/projectData.json');
    const aboutContent = await import('../../content/about.md');
    const skillsContent = await import('../../content/skills.md');
    const contactContent = await import('../../content/contact.md');

    fileSystem.children.home.children.guest.children.projects.children = projectFiles;
    fileSystem.children.home.children.guest.children['about.md'].content = aboutContent.default;
    fileSystem.children.home.children.guest.children['skills.md'].content = skillsContent.default;
    fileSystem.children.home.children.guest.children['contact.md'].content = contactContent.default;
  } catch (error) {
    console.error("Error loading files:", error);
  }
}