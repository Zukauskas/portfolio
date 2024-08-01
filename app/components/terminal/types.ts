export interface BootMessage {
  id: number;
  text: string;
  status?: 'OK' | 'FAIL';
}

export interface localFile {
  name: string;
  content: string;
  type: 'file' | 'directory';
  children?: { [name: string]: localFile };
}

export interface CommandResponse {
  output: string;
  newDirectory?: string[];
}