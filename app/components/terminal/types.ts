export interface BootMessage {
  id: number;
  text: string;
  status?: 'OK' | 'FAIL';
}

export interface File {
  name: string;
  content: string;
  type: 'file' | 'directory';
}

export interface Directory extends File {
  children: { [name: string]: File | Directory };
}

export interface CommandResponse {
  output: string;
  newDirectory?: string[];
}