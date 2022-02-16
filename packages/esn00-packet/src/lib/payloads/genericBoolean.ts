import { arrayBufferReadBoolean, arrayBufferWriteBoolean } from '../utilities';
import { IPayloadParselizer } from './index';

export class BooleanParselizer implements IPayloadParselizer {
  constructor(
    private readonly invert: boolean = false,
    private readonly offset: number = 0
  ) {}

  parse = (buffer: ArrayBufferLike): boolean => {
    const value = arrayBufferReadBoolean(buffer);
    return this.invert ? !value : value;
  };

  serialize = (payload: boolean): ArrayBufferLike => {
    const buffer = new ArrayBuffer(1);
    const value = this.invert ? !payload : payload;
    arrayBufferWriteBoolean(buffer, value, this.offset);
    return buffer;
  };
}
