import { IPayloadParselizer } from './index';

export class UInt8Parselizer implements IPayloadParselizer {
  private readonly offset: number = 0;

  parse = (buffer: Buffer): number => buffer.readUInt8(this.offset);

  serialize = (payload: number): Buffer => {
    const buffer: Buffer = Buffer.alloc(1 + this.offset);
    buffer.writeUInt8(payload, this.offset);
    return buffer;
  };
}
