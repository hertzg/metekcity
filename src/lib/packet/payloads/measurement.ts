import {
  bufferReadBoolean,
  bufferReadSignedNumber,
  bufferWriteBoolean,
  bufferWriteSignedNumber,
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
  parse = (buffer: Buffer): IMeasurement => ({
    value: bufferReadSignedNumber(buffer, 0),
    unit: buffer.readUInt8(3),
    settled: bufferReadBoolean(buffer, 4),
  });

  serialize = (payload: IMeasurement): Buffer => {
    const buffer = Buffer.alloc(5);
    bufferWriteSignedNumber(buffer, payload.value, 0);
    buffer.writeUInt8(payload.unit, 3);
    bufferWriteBoolean(buffer, payload.settled, 4);
    return buffer;
  };
}
