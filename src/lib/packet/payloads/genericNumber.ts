import { bufferReadNumber, bufferWriteNumber } from '../utilities';
import { IPayloadParselizer } from './index';

export class NumberParselizer implements IPayloadParselizer {
  private readonly offset: number = 0;

  parse = (buffer: Buffer): number => bufferReadNumber(buffer);

  serialize = (payload: number): Buffer => {
    const buffer: Buffer = Buffer.alloc(1);
    bufferWriteNumber(buffer, payload, this.offset);
    return buffer;
  };
}
