import { BootMessage } from './types';

export const bootMessages: BootMessage[] = [
  { id: 1, text: "Initializing system", status: 'OK' },
  { id: 2, text: "Loading kernel", status: 'OK' },
  { id: 3, text: "Mounting root filesystem", status: 'OK' },
  { id: 4, text: "Starting system logger", status: 'OK' },
  { id: 5, text: "Starting device manager", status: 'OK' },
  { id: 6, text: "Initializing network interfaces", status: 'OK' },
  { id: 7, text: "Starting firewall", status: 'OK' },
  { id: 8, text: "Setting up user environment", status: 'OK' },
  { id: 9, text: "Starting SSH server", status: 'OK' },
  { id: 10, text: "Loading developer profile", status: 'OK' },
  { id: 11, text: "Initializing portfolio interface", status: 'OK' },
];

export const getBootDuration = (): number => {
  // This function can be used to calculate the total boot time
  // For now, it returns a fixed duration, but you could make it dynamic
  return bootMessages.length * 300 + 1000; // 300ms per message + 1 second extra
};

export const simulateBootError = (index: number): BootMessage => {
  // This function can be used to simulate a boot error for testing or easter eggs
  return {
    ...bootMessages[index],
    status: 'FAIL'
  };
};