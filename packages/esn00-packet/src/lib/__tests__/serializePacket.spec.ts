import { bx } from '@hertzg/bx';
import { serializePacket } from '../serializePacket';

const SAMPLES: Array<[[number, string], string]> = [
  [[0xd0, '01064a0001'], 'feefc0a2_d0_05_01064a0001_27'],
  [[0xc0, '01'], 'feefc0a2_c0_01_01_c2'],
  [[0xc1, '00'], 'feefc0a2_c1_01_00_c2'],
  [
    [
      0xc2,
      '00001500017c00002a00003f0000540000940000a90000be0000d30000e80000fd000112',
    ],
    'feefc0a2_c2_24_00001500017c00002a00003f0000540000940000a90000be0000d30000e80000fd000112_fb',
  ],
];

describe('serializePacket', () => {
  it('should use passed values if present', () => {
    expect(
      serializePacket({
        header: bx('deda'),
        type: 0xde,
        length: 0xad,
        payload: Buffer.from([0xbe, 0xaf]),
        checksum: 0xb0,
      })
    ).toStrictEqual(bx('dedadeadbeafb0'));
  });

  it.each(SAMPLES)('%j -> %s', ([type, data], expected) => {
    expect(
      serializePacket({
        type,
        payload: bx(data),
      })
    ).toStrictEqual(bx(expected));
  });
});
