import { bufferReadBoolean, bufferWriteBoolean } from '../utilities';
import { IPayloadParselizer } from './index';

export class BooleanParselizer implements IPayloadParselizer {
  constructor(
    private readonly invert: boolean = false,
    private readonly offset: number = 0
  ) {}

  parse = (buffer: Buffer): boolean => {
    const value = bufferReadBoolean(buffer);
    return this.invert ? !value : value;
  };

  serialize = (payload: boolean): Buffer => {
    const buffer: Buffer = Buffer.alloc(1);
    const value = this.invert ? !payload : payload;
    bufferWriteBoolean(buffer, value, this.offset);
    return buffer;
  };
}
