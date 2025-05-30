import { BootMessage } from './types';

export const bootMessages: BootMessage[] = [
  { id: 1, text: "Booting ZukauskasOS v4.2.0...", status: 'INITIATING' },
  { id: 2, text: "System integrity check", status: 'PASSED' },
  { id: 3, text: "Loading kernel modules", status: 'OK' },
  { id: 4, text: "Initializing AI core processors (1024 units)", status: 'DONE' },
  { id: 5, text: "Mounting quantum memory banks", status: 'OK' },
  { id: 6, text: "Loading neural network models (ZPT-3 Large)", status: 'LOADING...' },
  { id: 7, text: "Verifying ZPT-3 model integrity", status: 'PASSED' },
  { id: 8, text: "Calibrating quantum entanglement interface for AI Whisperer protocols", status: 'CALIBRATING' },
  { id: 9, text: "AI Whisperer module link stability", status: 'STABLE' },
  { id: 10, text: "Cognitive enhancers", status: 'ONLINE' },
  { id: 11, text: "Sentiment analysis unit", status: 'ACTIVE' },
  { id: 12, text: "Predictive behavior algorithms", status: 'ENGAGED' },
  { id: 13, text: "Initializing Developer Portfolio Interface v2.7.1", status: 'OK' },
  { id: 14, text: "All systems nominal. Welcome, AI Whisperer.", status: 'READY' },
];

export const getBootDuration = (): number => {
  return bootMessages.length * 300 + 1000; // 300ms per message + 1 second extra
};

// Optional: Function to simulate a boot error for testing or easter eggs
export const simulateBootError = (index: number): BootMessage => {
  return {
    ...bootMessages[index],
    status: 'FAIL',
    text: bootMessages[index].text.replace('...', '.ERROR.') // Example modification
  };
};