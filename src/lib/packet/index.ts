import { PayloadType } from './payloads';

export interface ISerializablePacket<T extends PayloadType | Buffer = Buffer> {
  header?: Buffer;
  type: number;
  length?: number;
  payload: T;
  checksum?: number;
}

export interface IPacket<T extends PayloadType | Buffer = Buffer>
  extends ISerializablePacket<T> {
  header: Buffer;
  length: number;
  checksum: number;
}

export * from './parselize';
export * from './parsePacket';
export * from './payloads';
export * from './serializePacket';
