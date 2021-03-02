import { bx } from '@hertzg/bx';
import { calculateChecksum } from '../checksum';

const SAMPLES: Array<[string, number]> = [
  ['', 0x00],
  ['00', 0x00],
  ['ff00', 0xff],
  ['00ff', 0xff],
  ['ff01', 0x00],
  ['ffff', 0xfe],
  ['c00104', 0xc5],
  ['d40100', 0xd5],
  ['d502012d', 0x05],
  [
    'c22400001500017c00002a00003f0000540000940000a90000be0000d30000e80000fd000112',
    0xfb,
  ],
];

describe('Checksum', () => {
  it.each(SAMPLES)('%j -> %j', (hex, expected) => {
    expect(calculateChecksum(bx(hex))).toBe(expected);
  });
});
