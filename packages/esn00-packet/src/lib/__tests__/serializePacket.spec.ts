import { bx, bxx } from '@hertzg/bx';
import { serializePacket } from '../serializePacket';
import { arrayBufferToHexString } from '../utilities';
import { ISerializablePacket } from '../index';

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
  const assertSerialize = <T extends ISerializablePacket>(
    pkt: T,
    hex: string
  ) => {
    expect(arrayBufferToHexString(serializePacket(pkt))).toStrictEqual(hex);
  };

  it('should use passed values if present', () => {
    assertSerialize(
      {
        header: bx('deda'),
        type: 0xde,
        length: 0xad,
        payload: new Uint8Array([0xbe, 0xaf]),
        checksum: 0xb0,
      },
      'dedadeadbeafb0'
    );
  });

  it.each(SAMPLES)('%s -> %s', ([type, data], expected) => {
    assertSerialize(
      {
        type,
        payload: bx(data),
      },
      bxx(expected).toString('hex')
    );
  });
});
