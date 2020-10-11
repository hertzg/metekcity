import { uint8Sum } from './utilities';

export const calculateChecksum = (
  buffer: Buffer,
  prevSum = 0
): number => buffer.reduce(uint8Sum, prevSum);
