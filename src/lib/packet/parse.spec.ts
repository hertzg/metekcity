import { parsePacket } from "./parse";
import { bx } from "./utilities";
import { HEADER } from "./constants";

const parse = (hex: string) => parsePacket(bx(hex));

describe("Sample packet checks", () => {
  it("should parse generic packet structure", () => {
    const pkt = parse("feefc0_a2_ff_04_00010203_ee");
    expect(pkt).toBeTruthy();
    expect(pkt.header).toEqual(HEADER);
    expect(pkt.type).toEqual(0xff);
    expect(pkt.checksum).toEqual(0xee);
    expect(pkt.length).toEqual(4);
    expect(pkt.payload).toBeTruthy();
    expect(pkt.payload).toHaveLength(pkt.length);
    expect(pkt.payload).toEqual(bx("00010203"));
  });
});
