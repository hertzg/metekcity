import {
  IParselizerParser,
  IParselizerSerializer,
  PayloadType,
} from './payloads';
import { parsePacket } from './parsePacket';
import { IPacket, ISerializablePacket, serializePacket } from './index';
import PayloadParselizer from './payloads/payloadParselizer';

const globalParselizer = new PayloadParselizer();

type ParseResult = PayloadType | Buffer;

export const parse = (
  buffer: Buffer,
  parselizer: IParselizerParser = globalParselizer
): IPacket<ParseResult> => {
  const pkt = parsePacket(buffer);

  const payload = parselizer.parse(pkt.type, pkt.payload);
  if (payload == null) {
    return pkt;
  }

  return {
    ...pkt,
    payload,
  };
};

export const serialize = (
  pkt: ISerializablePacket<Buffer | PayloadType>,
  parselizer: IParselizerSerializer = globalParselizer
): Buffer => {
  const payload =
    pkt.payload instanceof Buffer
      ? pkt.payload
      : parselizer.serialize(pkt.type, pkt.payload);

  return serializePacket({
    ...pkt,
    payload,
  });
};
