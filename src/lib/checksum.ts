const uInt8Sum = (a: number, b: number): number =>
  ((a & 0xff) + (b & 0xff)) & 0xff;

export const calculateChecksum = (
  buffer: Buffer,
  prevSum: number = 0
): number => buffer.reduce(uInt8Sum, prevSum);
