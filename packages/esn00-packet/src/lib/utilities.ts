export const uint8 = (value: number): number => value & 0xff;

export const uint8Sum = (a: number, b: number): number =>
  uint8(uint8(a) + uint8(b));

export const asDataView = (buffer: ArrayBufferLike | DataView): DataView =>
  ArrayBuffer.isView(buffer) ? buffer : new DataView(buffer);

export const arrayBufferReadNumber = (
  buffer: ArrayBufferLike | DataView,
  offset = 0
): number => Number(asDataView(buffer).getUint16(offset, false));

export const arrayBufferWriteNumber = (
  buffer: ArrayBufferLike | DataView,
  value: number,
  offset = 0
): number => {
  const numberValue = Math.abs(value);
  asDataView(buffer).setUint16(offset, numberValue, false);
  return numberValue;
};

const arrayBufferReadSign = (
  buffer: ArrayBufferLike | DataView,
  offset?: number
): number => (arrayBufferReadBoolean(buffer, offset) ? -1 : 1);

const arrayBufferWriteSign = (
  buffer: ArrayBufferLike | DataView,
  value: number,
  offset = 0
): number => {
  const numberValue = Math.sign(value) < 0 ? 1 : 0;
  asDataView(buffer).setUint8(offset, numberValue);
  return numberValue;
};

export const arrayBufferReadSignedNumber = (
  buffer: ArrayBufferLike | DataView,
  offset = 0
): number =>
  arrayBufferReadSign(buffer, offset) *
  arrayBufferReadNumber(buffer, offset + 1);

export const arrayBufferWriteSignedNumber = (
  buffer: ArrayBufferLike | DataView,
  value: number,
  offset = 0
): number => {
  arrayBufferWriteSign(buffer, value, offset);
  return arrayBufferWriteNumber(buffer, value, offset + 1);
};

export const arrayBufferReadBoolean = (
  buffer: ArrayBufferLike | DataView,
  offset = 0
): boolean => Boolean(asDataView(buffer).getUint8(offset));

export const arrayBufferWriteBoolean = (
  buffer: ArrayBufferLike | DataView,
  value: boolean,
  offset = 0
): number => {
  const numberValue = Number(value);
  asDataView(buffer).setUint8(offset, numberValue);
  return numberValue;
};
