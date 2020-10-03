import { PayloadType } from './payloads';

export interface IPacket<T extends PayloadType | Buffer = Buffer> {
  header: Buffer;
  type: number;
  length: number;
  payload: T;
  checksum: number;
}

export * from './parse';
export * from './parsePacket';
export * from './payloads';
