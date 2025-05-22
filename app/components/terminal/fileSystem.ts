import { LocalFile, DirectoryNode, FileNode } from './types';

export const fileSystem: DirectoryNode = {
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
            'about.md': { name: 'about.md', type: 'file', content: '' } as FileNode,
            'skills.md': { name: 'skills.md', type: 'file', content: '' } as FileNode,
            'contact.md': { name: 'contact.md', type: 'file', content: '' } as FileNode,
            'projects': {
              name: 'projects',
              type: 'directory',
              content: '',
              children: {} // This will be populated dynamically
            } as DirectoryNode
          }
        } as DirectoryNode
      }
    } as DirectoryNode
  }
};

export const getFileOrDirectory = (path: string[]): LocalFile | null => {
  let current: LocalFile = fileSystem;
  for (const segment of path) {
    if (current.type === 'directory' && current.children && segment in current.children) {
      current = current.children[segment];
    } else {
      return null;
    }
  }
  return current;
};

interface RawProjectFile {
  name: string;
  type: 'file'; // Assuming all projects are files
  content: string;
}

interface ProjectData {
  [key: string]: RawProjectFile;
}

export async function loadAllFiles() {
  try {
    const projectFilesModule = await import('../../projects/projectData.json');
    // Assert the type of projectFilesModule.default to ProjectData
    const projectFiles: ProjectData = projectFilesModule.default as ProjectData;
    
    // MDX imports will yield components, not raw strings.
    // For fileSystem.ts, we need strings. Since raw-loader isn't configured,
    // these will effectively be empty for the purpose of `cat` or raw display.
    const aboutContentModule = await import('../../content/about.md');
    const aboutContent: string = ''; // Default to empty string
    
    const skillsContentModule = await import('../../content/skills.md');
    const skillsContent: string = ''; // Default to empty string
    
    const contactContentModule = await import('../../content/contact.md');
    const contactContent: string = ''; // Default to empty string

    // Type-safe access to nested directories
    const homeDir = fileSystem.children.home;
    if (homeDir && homeDir.type === 'directory') {
      const guestDirNode = homeDir.children.guest;
      if (guestDirNode && guestDirNode.type === 'directory') {
        const guestDir = guestDirNode as DirectoryNode;

        const aboutMd = guestDir.children['about.md'];
        if (aboutMd && aboutMd.type === 'file') {
          (aboutMd as FileNode).content = aboutContent;
        }

        const skillsMd = guestDir.children['skills.md'];
        if (skillsMd && skillsMd.type === 'file') {
          (skillsMd as FileNode).content = skillsContent;
        }

        const contactMd = guestDir.children['contact.md'];
        if (contactMd && contactMd.type === 'file') {
          (contactMd as FileNode).content = contactContent;
        }

        const projectsDirNode = guestDir.children.projects;
        if (projectsDirNode && projectsDirNode.type === 'directory') {
          const projectsDir = projectsDirNode as DirectoryNode;
          for (const projectKey in projectFiles) {
            const project = projectFiles[projectKey];
            projectsDir.children[project.name] = {
              name: project.name,
              type: 'file', // Assuming all projects are files
              content: project.content,
            } as FileNode;
          }
        }
      }
    }
  } catch (error) {
    console.error("Error loading files:", error);
  }
}