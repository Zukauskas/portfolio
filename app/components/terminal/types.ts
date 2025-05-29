export interface BootMessage {
  id: number;
  text: string;
  status?: 'OK' | 'FAIL';
}

export interface FileNode {
  name: string;
  type: 'file';
  content: string;
}

export interface DirectoryNode {
  name: string;
  type: 'directory';
  children: { [key: string]: LocalFile };
  content?: string; 
}

export type LocalFile = FileNode | DirectoryNode;

export interface CommandResponse {
  output: string | string[] | null;
  newDirectory?: string[];
  error?: boolean; // Added property
}