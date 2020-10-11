import { bx } from '../utilities';
import { parsePacket } from '../parsePacket';

describe('Sample packet checks', () => {
  it('should parse generic packet structure', () => {
    const pkt = parsePacket(bx('feefc0a2_ff_04_00010203_ee'));
    expect(pkt).toBeTruthy();
    expect(pkt.header).toEqual(bx('feefc0a2'));
    expect(pkt.type).toEqual(0xff);
    expect(pkt.checksum).toEqual(0xee);
    expect(pkt.length).toEqual(4);
    expect(pkt.payload).toBeTruthy();
    expect(pkt.payload).toHaveLength(pkt.length);
    expect(pkt.payload).toEqual(bx('00010203'));
  });
});
