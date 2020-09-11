import { Packet } from "./index";

export const parsePacket = (buffer: Buffer): Packet => {
  const header = buffer.slice(0, 4);
  const type = buffer.readUInt8(4);
  const length = buffer.readUInt8(5);
  const payload = buffer.slice(6, 6 + length);
  const checksum = buffer.readUInt8(6 + length);

  return {
    header,
    type,
    length,
    payload,
    checksum,
  };
};
