import { ISerializablePacket } from './index';
import { HEADER } from './constants';
import { calculateChecksum } from './checksum';

export const serializePacket = <T extends Buffer = Buffer>(
  pkt: ISerializablePacket<T>
): Buffer => {
  const body = Buffer.concat([
    Buffer.from([pkt.type & 0xff]),
    Buffer.from(
      pkt.length != null ? [pkt.length & 0xff] : [pkt.payload.length & 0xff]
    ),
    Buffer.from(pkt.payload),
  ]);

  return Buffer.concat([
    Buffer.from(pkt.header != null ? pkt.header : HEADER),
    body,
    Buffer.from([
      (pkt.checksum != null ? pkt.checksum : calculateChecksum(body)) & 0xff,
    ]),
  ]);
};
