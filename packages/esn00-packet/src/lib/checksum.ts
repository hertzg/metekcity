import { uint8Sum } from './utilities';

export const calculateChecksum = (
  buffer: ArrayBufferLike,
  prevSum = 0
): number => new Uint8Array(buffer).reduce(uint8Sum, prevSum);
