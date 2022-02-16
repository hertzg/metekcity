import { ISerializablePacket } from './index';
import { HEADER } from './constants';
import { calculateChecksum } from './checksum';
import { uint8 } from './utilities';

const uint8ArrayBufferAppend = (
  buffer: Uint8Array,
  data: ArrayLike<number>,
  offset = 0
): number => {
  buffer.set(data, offset);
  return offset + data.length;
};

const makePacket = (
  header: ArrayBufferLike,
  type: number,
  payload: ArrayBufferLike,
  payloadLength?: number,
  checksum?: number
) => {
  // packet = header + type (1 byte) + length (1 byte) + payload + checksum (1 byte)
  const buffer = new Uint8Array(header.byteLength + 3 + payload.byteLength);

  let cursor = 0;
  // header
  cursor = uint8ArrayBufferAppend(buffer, new Uint8Array(header), cursor);

  const checksumOffset = cursor;
  // type (1 byte) + length (1 byte)
  cursor = uint8ArrayBufferAppend(
    buffer,
    [uint8(type), uint8(payloadLength ?? payload.byteLength)],
    cursor
  );

  // payload
  cursor = uint8ArrayBufferAppend(buffer, new Uint8Array(payload), cursor);

  const checksumData = new Uint8Array(
    buffer.buffer,
    checksumOffset,
    payload.byteLength + 2
  );
  // checksum (1 byte)
  uint8ArrayBufferAppend(
    buffer,
    [uint8(checksum ?? calculateChecksum(checksumData))],
    cursor
  );

  return buffer.buffer;
};

export const serializePacket = <T extends ArrayBufferLike = ArrayBufferLike>(
  pkt: ISerializablePacket<T>
): ArrayBufferLike =>
  makePacket(
    pkt.header ?? HEADER,
    pkt.type,
    pkt.payload,
    pkt.length,
    pkt.checksum
  );
