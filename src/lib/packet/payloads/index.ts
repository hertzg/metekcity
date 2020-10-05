import MeasurementParselizer, { IMeasurement } from './measurement';
import { PacketType } from '../types';
import { BooleanParselizer } from './genericBoolean';
import { UInt16Parselizer } from './genericUInt16';
import { UInt8Parselizer } from './genericUInt8';

export type PayloadType = Exclude<number | boolean | IMeasurement, null>;

export interface IPayloadParselizer {
  parse(buffer: Buffer): PayloadType | null;

  serialize(payload: Exclude<PayloadType, null>): Buffer | null;
}

export default class PayloadParselizer {
  constructor(
    private readonly booleanParselizer = new BooleanParselizer(),
    private readonly uint8Parselizer = new UInt8Parselizer(),
    private readonly uint16Parselizer = new UInt16Parselizer(),
    private readonly measurementParselizer = new MeasurementParselizer()
  ) {}

  getPayloadCodec = (type: PacketType): IPayloadParselizer | null => {
    switch (type) {
      case PacketType.AUTO_OFF_STATE:
        return this.uint16Parselizer;
      case PacketType.SET_UNIT:
      case PacketType.SET_AUTO_OFF:
        return this.uint8Parselizer;
      case PacketType.ITEM_STATE:
      case PacketType.SET_TARE:
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
