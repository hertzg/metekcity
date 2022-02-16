import { IPacket } from './index';
import { asDataView } from './utilities';

export const parsePacket = (buffer: ArrayBufferLike): IPacket => {
  const dataView = asDataView(buffer);

  const header = buffer.slice(0, 4);
  const type = dataView.getUint8(4);
  const length = dataView.getUint8(5);
  const payload = buffer.slice(6, 6 + length);
  const checksum = dataView.getUint8(6 + length);

  return {
    header,
    type,
    length,
    payload,
    checksum,
  };
};
