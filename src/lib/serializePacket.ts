import { ISerializablePacket } from './index';
import { HEADER } from './constants';
import { calculateChecksum } from './checksum';

const { from, concat } = Buffer;

export const serializePacket = <T extends Buffer = Buffer>(
  pkt: ISerializablePacket<T>
): Buffer => {
  const body = concat([
    from([pkt.type & 0xff]),
    from(
      pkt.length != null ? [pkt.length & 0xff] : [pkt.payload.length & 0xff]
    ),
    from(pkt.payload),
  ]);

  return concat([
    from(pkt.header != null ? pkt.header : HEADER),
    body,
    from([
      (pkt.checksum != null ? pkt.checksum : calculateChecksum(body)) & 0xff,
    ]),
  ]);
};
