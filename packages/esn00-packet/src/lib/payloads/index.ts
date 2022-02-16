import { IMeasurement } from './measurement';

export type PayloadType = Exclude<number | boolean | IMeasurement, null>;

export interface IPayloadParselizer {
  parse(buffer: ArrayBufferLike): PayloadType | null;

  serialize(payload: Exclude<PayloadType, null>): ArrayBufferLike | null;
}

export * from './payloadParselizer';
export * from './measurement';
export * from './genericBoolean';
export * from './genericUInt8';
export * from './genericUInt16';
