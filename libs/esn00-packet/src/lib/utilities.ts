export const uint8 = (value: number): number => value & 0xff;

export const uint8Sum = (a: number, b: number): number =>
  uint8(uint8(a) + uint8(b));

export const bufferReadNumber = (buffer: Buffer, offset = 0): number =>
  Number(buffer.readUInt16BE(offset));

export const bufferWriteNumber = (
  buffer: Buffer,
  value: number,
  offset = 0
): number => buffer.writeUInt16BE(Math.abs(value), offset);

const bufferReadSign = (buffer: Buffer, offset?: number): number =>
  bufferReadBoolean(buffer, offset) ? -1 : 1;

const bufferWriteSign = (
  buffer: Buffer,
  value: number,
  offset: number = 0
): number => buffer.writeUInt8(Math.sign(value) < 0 ? 1 : 0, offset);

export const bufferReadSignedNumber = (buffer: Buffer, offset = 0): number =>
  bufferReadSign(buffer, offset) * bufferReadNumber(buffer, offset + 1);

export const bufferWriteSignedNumber = (
  buffer: Buffer,
  value: number,
  offset = 0
): number => {
  bufferWriteSign(buffer, value, offset);
  return bufferWriteNumber(buffer, value, offset + 1);
};

export const bufferReadBoolean = (buffer: Buffer, offset = 0): boolean =>
  Boolean(buffer.readUInt8(offset));

export const bufferWriteBoolean = (
  buffer: Buffer,
  value: boolean,
  offset = 0
): number => buffer.writeUInt8(Number(value), offset);
