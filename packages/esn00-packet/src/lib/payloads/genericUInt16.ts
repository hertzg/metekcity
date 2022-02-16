import { arrayBufferReadNumber, arrayBufferWriteNumber } from '../utilities';
import { IPayloadParselizer } from './index';

export class UInt16Parselizer implements IPayloadParselizer {
  private readonly offset: number = 0;

  parse = (buffer: ArrayBufferLike): number =>
    arrayBufferReadNumber(buffer, this.offset);

  serialize = (payload: number): ArrayBufferLike => {
    const buffer = new ArrayBuffer(2 + this.offset);
    arrayBufferWriteNumber(buffer, payload, this.offset);
    return buffer;
  };
}
