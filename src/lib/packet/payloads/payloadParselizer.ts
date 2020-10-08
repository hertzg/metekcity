import { PacketType } from '../types';
import { BooleanParselizer } from './genericBoolean';
import { UInt8Parselizer } from './genericUInt8';
import { UInt16Parselizer } from './genericUInt16';
import { MeasurementParselizer } from './measurement';
import { IPayloadParselizer, PayloadType } from './index';

export interface IParselizerParser {
  parse(type: PacketType, payload: Buffer): PayloadType | null;
}

export interface IParselizerSerializer {
  serialize(
    type: PacketType,
    payload: Exclude<PayloadType, null>
  ): Buffer | null;
}

export interface IParselizer extends IParselizerParser, IParselizerSerializer {}

export default class PayloadParselizer implements IParselizer {
  constructor(
    private readonly _invertedBooleanParselizer = new BooleanParselizer(true),
    private readonly _booleanParselizer = new BooleanParselizer(),
    private readonly _uint8Parselizer = new UInt8Parselizer(),
    private readonly _uint16Parselizer = new UInt16Parselizer(),
    private readonly _measurementParselizer = new MeasurementParselizer()
  ) {}

  private _getCodec = (type: PacketType): IPayloadParselizer | null => {
    switch (type) {
      case PacketType.AUTO_OFF_STATE:
        return this._uint16Parselizer;
      case PacketType.SET_UNIT:
      case PacketType.SET_AUTO_OFF:
      case PacketType.UNIT_STATE:
        return this._uint8Parselizer;
      case PacketType.ITEM_STATE:
      case PacketType.TARE_STATE:
      case PacketType.ERROR_STATE:
        return this._invertedBooleanParselizer;
      case PacketType.SET_TARE:
        return this._booleanParselizer;
      case PacketType.MEASUREMENT:
        return this._measurementParselizer;
      default:
        return null;
    }
  };

  parse = (type: PacketType, payload: Buffer): PayloadType | null => {
    const parselizer = this._getCodec(type);
    if (!parselizer) {
      return null;
    }

    return parselizer.parse(payload);
  };

  serialize = (
    type: PacketType,
    payload: Exclude<PayloadType, null>
  ): Buffer | null => {
    const parselizer = this._getCodec(type);
    if (!parselizer) {
      return null;
    }

    return parselizer.serialize(payload);
  };
}
