import MeasurementParselizer, { IMeasurement } from './measurement';
import { PacketType } from '../types';
import { BooleanParselizer } from './genericBoolean';

export type PayloadType = Exclude<boolean | IMeasurement, null>;

export interface IPayloadParselizer {
  parse(buffer: Buffer): PayloadType | null;

  serialize(payload: Exclude<PayloadType, null>): Buffer | null;
}

export default class PayloadParselizer {
  constructor(
    private readonly booleanParselizer = new BooleanParselizer(),
    private readonly measurementParselizer = new MeasurementParselizer()
  ) {}

  getPayloadCodec = (type: PacketType): IPayloadParselizer | null => {
    switch (type) {
      case PacketType.ITEM_STATE:
      case PacketType.TARE_STATE:
      case PacketType.ERROR_STATE:
        return this.booleanParselizer;
      case PacketType.MEASUREMENT:
        return this.measurementParselizer;
      default:
        return null;
    }
  };

  parse = (type: PacketType, payload: Buffer): PayloadType | null => {
    const parselizer = this.getPayloadCodec(type);
    if (!parselizer) {
      return null;
    }

    return parselizer.parse(payload);
  };

  serialize = (
    type: PacketType,
    payload: Exclude<PayloadType, null>
  ): Buffer | null => {
    const parselizer = this.getPayloadCodec(type);
    if (!parselizer) {
      return null;
    }

    return parselizer.serialize(payload);
  };
}

export * from './measurement';
export * from './genericBoolean';
