import { bx } from '../utilities';
import { parse } from '../parselize';
import { PacketType } from '../types';
import { MeasurementUnit } from '../payloads';

describe('parser checks', () => {
  it('should parse unknown packet payloads as buffer', () => {
    const pkt = parse(bx('feefc0a2_ff_04_00010203_ee'));
    expect(pkt).toBeTruthy();
    expect(pkt.type).toEqual(0xff);
    expect(pkt.payload).toBeTruthy();
    expect(pkt.payload).toBeInstanceOf(Buffer);
    expect(pkt.payload).toHaveLength(pkt.length);
    expect(pkt.payload).toEqual(bx('00010203'));
  });

  it('should parse known packets', () => {
    const pkt = parse(bx('feefc0a2_d0_05_01146e0001_59'));
    expect(pkt).toBeTruthy();
    expect(pkt.type).toEqual(PacketType.MEASUREMENT);
    expect(pkt.payload).toEqual({
      settled: true,
      unit: MeasurementUnit.GRAM,
      value: -5230,
    });
  });
});
