import { PayloadType } from './payloads';

export interface ISerializablePacket<
  T extends PayloadType | ArrayBufferLike = ArrayBufferLike
> {
  header?: ArrayBufferLike;
  type: number;
  length?: number;
  payload: T;
  checksum?: number;
}

export interface IPacket<
  T extends PayloadType | ArrayBufferLike = ArrayBufferLike
> extends ISerializablePacket<T> {
  header: ArrayBufferLike;
  length: number;
  checksum: number;
}

export * from './parselize';
export * from './parsePacket';
export * from './payloads';
export * from './serializePacket';
export { IParselizer } from './payloads/payloadParselizer';
