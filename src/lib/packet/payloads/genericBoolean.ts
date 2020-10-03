import { bufferReadBoolean, bufferWriteBoolean } from '../utilities';
import { IPayloadParselizer } from './index';

export class BooleanParselizer implements IPayloadParselizer {
  private readonly offset: number = 0;

  parse = (buffer: Buffer): boolean => bufferReadBoolean(buffer);

  serialize = (payload: boolean): Buffer => {
    const buffer: Buffer = Buffer.alloc(1);
    bufferWriteBoolean(buffer, payload, this.offset);
    return buffer;
  };
}
