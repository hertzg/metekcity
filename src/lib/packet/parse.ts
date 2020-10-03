import PayloadParser, { PayloadType } from './payloads';
import { parsePacket } from './parsePacket';
import { IPacket } from './index';

const payloadParser = new PayloadParser();

type ParseResult = PayloadType | Buffer;

export const parse = (buffer: Buffer): IPacket<ParseResult> => {
  const pkt = parsePacket(buffer);

  const payload = payloadParser.parse(pkt.type, pkt.payload);
  if (payload == null) {
    return pkt;
  }
  return {
    ...pkt,
    payload,
  };
};
