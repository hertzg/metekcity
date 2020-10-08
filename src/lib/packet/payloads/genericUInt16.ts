import { bufferReadNumber, bufferWriteNumber } from '../utilities';
import { IPayloadParselizer } from './index';

export class UInt16Parselizer implements IPayloadParselizer {
  private readonly offset: number = 0;

  parse = (buffer: Buffer): number => bufferReadNumber(buffer, this.offset);

  serialize = (payload: number): Buffer => {
    const buffer: Buffer = Buffer.alloc(2 + this.offset);
    bufferWriteNumber(buffer, payload, this.offset);
    return buffer;
  };
}
