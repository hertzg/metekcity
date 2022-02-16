import { IPayloadParselizer } from './index';
import { asDataView } from '../utilities';

export class UInt8Parselizer implements IPayloadParselizer {
  private readonly offset: number = 0;

  parse = (buffer: ArrayBufferLike): number =>
    asDataView(buffer).getUint8(this.offset);

  serialize = (payload: number): ArrayBufferLike => {
    const dataView = asDataView(new Uint8Array(1 + this.offset));
    dataView.setUint8(this.offset, payload);
    return dataView.buffer;
  };
}
