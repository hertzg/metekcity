import MeasurementParselizer, { IMeasurement } from './measurement';
import { PacketType } from '../types';
import { BooleanParselizer } from './genericBoolean';

export type PayloadType = boolean | IMeasurement;

export interface IPayloadParselizer {
  parse(buffer: Buffer): PayloadType;

  serialize(payload: PayloadType): Buffer;
}

export default class PayloadParser {
  constructor(
    private readonly booleanParselizer = new BooleanParselizer(),
    private readonly measurementParselizer = new MeasurementParselizer()
  ) {}

  parse = (type: PacketType, payload: Buffer): PayloadType | null => {
    switch (type) {
      case PacketType.ITEM_STATE:
      case PacketType.TARE_STATE:
      case PacketType.ERROR_STATE:
        return this.booleanParselizer.parse(payload);
      case PacketType.MEASUREMENT:
        return this.measurementParselizer.parse(payload);
    }
    return null;
  };
}

export * from './measurement';
export * from './genericBoolean';
