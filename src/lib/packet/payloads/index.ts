import { IMeasurement } from './measurement';

export type PayloadType = Exclude<number | boolean | IMeasurement, null>;

export interface IPayloadParselizer {
  parse(buffer: Buffer): PayloadType | null;

  serialize(payload: Exclude<PayloadType, null>): Buffer | null;
}

export * from './payloadParselizer';
export * from './measurement';
export * from './genericBoolean';
export * from './genericUInt8';
export * from './genericUInt16';
