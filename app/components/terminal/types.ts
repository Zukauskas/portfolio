export interface TerminalState {
  bootMessages: BootMessage[];
  currentDirectory: string[];
  localFiles: LocalFile[];
  commandOutput: string | string[] | null;
  error?: boolean; // Added property
}

export interface BootMessage {
  id: number;
  text: string;
  status?: 'INITIATING' | 'PASSED' | 'OK' | 'DONE' | 'LOADING...' | 'CALIBRATING' | 'STABLE' | 'ONLINE' | 'ACTIVE' | 'ENGAGED' | 'READY' | 'ERROR' | 'FAIL';
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