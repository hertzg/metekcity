import {
  arrayBufferReadBoolean,
  arrayBufferReadSignedNumber,
  arrayBufferWriteBoolean,
  arrayBufferWriteSignedNumber,
  asDataView,
} from '../utilities';
import { IPayloadParselizer } from './index';

export const enum MeasurementUnit {
  GRAM = 0x00,
  POUND_OUNCE = 0x01,
  MILLILITER_WATER = 0x02,
  FLUID_OUNCE_WATER = 0x03,
  MILLILITER_MILK = 0x04,
  FLUID_OUNCE_MILK = 0x05,
  OUNCE_WATER = 0x06,
}

export interface IMeasurement {
  value: number;
  unit: MeasurementUnit;
  settled: boolean;
}

export class MeasurementParselizer implements IPayloadParselizer {
  parse = (buffer: ArrayBufferLike): IMeasurement => {
    const dataView = asDataView(buffer);
    return {
      value: arrayBufferReadSignedNumber(dataView, 0),
      unit: dataView.getUint8(3),
      settled: arrayBufferReadBoolean(dataView, 4),
    };
  };

  serialize = (payload: IMeasurement): ArrayBuffer => {
    const buffer = new Uint8Array(5);
    arrayBufferWriteSignedNumber(buffer.buffer, payload.value, 0);
    buffer[3] = payload.unit;
    arrayBufferWriteBoolean(buffer, payload.settled, 4);
    return buffer.buffer;
  };
}
