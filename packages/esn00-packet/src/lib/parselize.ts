import {
  IParselizerParser,
  IParselizerSerializer,
  PayloadType,
} from './payloads';
import { parsePacket } from './parsePacket';
import { IPacket, ISerializablePacket, serializePacket } from './index';
import PayloadParselizer from './payloads/payloadParselizer';

const globalParselizer = new PayloadParselizer();

type ParseResult = PayloadType | ArrayBufferLike;

export const parse = (
  buffer: ArrayBufferLike,
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
  pkt: ISerializablePacket<ArrayBufferLike | PayloadType>,
  parselizer: IParselizerSerializer = globalParselizer
): ArrayBufferLike | null => {
  if (
    pkt.payload instanceof ArrayBuffer ||
    (window.SharedArrayBuffer &&
      pkt.payload instanceof window.SharedArrayBuffer)
  ) {
    return serializePacket(pkt as ISerializablePacket);
  }

  const payload = parselizer.serialize(pkt.type, pkt.payload as PayloadType);

  if (payload == null) {
    throw new TypeError(
      `Tried to serialize packet of unknown type ${pkt.type}`
    );
  }

  return serializePacket({
    ...pkt,
    payload,
  });
};
