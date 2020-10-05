import { bx } from '../utilities';
import { parse, serialize } from '../parselize';
import { IPacket, MeasurementUnit, PayloadType } from '../index';
import { HEADER } from '../constants';
import { PacketType } from '../types';

const PK = (
  type: number,
  payloads: [Buffer, PayloadType] | Buffer,
  checksum: number
): [Buffer, IPacket<PayloadType | Buffer>] => {
  let raw: string, payload: any, length: number;
  if (payloads == null || payloads instanceof Buffer) {
    if (payloads == null) {
      raw = '';
      payload = Buffer.alloc(0);
    } else {
      raw = payloads.toString('hex');
      payload = payloads;
    }
    length = payload.length;
  } else {
    raw = payloads[0].toString('hex');
    payload = payloads[1];
    length = payloads[0].length;
  }

  return [
    bx(
      [
        HEADER.toString('hex'),
        type.toString(16).padStart(2, '0'),
        length.toString(16).padStart(2, '0'),
        raw,
        checksum.toString(16).padStart(2, '0'),
      ].join('')
    ),
    {
      header: HEADER,
      type,
      length,
      payload,
      checksum,
    },
  ];
};

const SAMPLES: Array<[string, Buffer, IPacket<PayloadType | Buffer>]> = [
  ['UNKNOWN_ff/withData', ...PK(0xff, bx('00010203'), 0x09)],
  ['UNKNOWN_ff/noData', ...PK(0xff, bx(''), 0xff)],

  [
    'SET_UNIT/g',
    ...PK(PacketType.SET_UNIT, [bx('00'), MeasurementUnit.GRAM], 0xc1),
  ],
  [
    'SET_UNIT/ml',
    ...PK(
      PacketType.SET_UNIT,
      [bx('02'), MeasurementUnit.MILLILITER_WATER],
      0xc3
    ),
  ],
  [
    'SET_UNIT/mlm',
    ...PK(
      PacketType.SET_UNIT,
      [bx('04'), MeasurementUnit.MILLILITER_MILK],
      0xc5
    ),
  ],

  ['SET_AUTO_OFF/2min', ...PK(PacketType.SET_AUTO_OFF, [bx('78'), 0x78], 0x3d)],
  [
    'AUTO_OFF_STATE/2min',
    ...PK(PacketType.AUTO_OFF_STATE, [bx('0178'), 0x178], 0x50),
  ],

  ['SET_TARE/true', ...PK(PacketType.SET_TARE, [bx('00'), false], 0xc2)],
  ['SET_TARE/false', ...PK(PacketType.SET_TARE, [bx('01'), true], 0xc3)],

  ['ERROR_STATE/true', ...PK(PacketType.ERROR_STATE, [bx('01'), true], 0xe2)],
  ['ERROR_STATE/false', ...PK(PacketType.ERROR_STATE, [bx('00'), false], 0xe1)],

  ['TARE_STATE/true', ...PK(PacketType.TARE_STATE, [bx('01'), true], 0xd5)],
  ['TARE_STATE/false', ...PK(PacketType.TARE_STATE, [bx('00'), false], 0xd4)],

  ['ITEM_STATE/true', ...PK(PacketType.ITEM_STATE, [bx('01'), true], 0xe6)],
  ['ITEM_STATE/false', ...PK(PacketType.ITEM_STATE, [bx('00'), false], 0xe5)],

  [
    'MEASUREMENT/g/settled/-523',
    ...PK(
      PacketType.MEASUREMENT,
      [
        bx('01146e0001'),
        {
          value: -5230,
          unit: MeasurementUnit.GRAM,
          settled: true,
        },
      ],
      0x59
    ),
  ],
  [
    'MEASUREMENT/mlw/notSettled/1079',
    ...PK(
      PacketType.MEASUREMENT,
      [
        bx('002a260200'),
        {
          value: 10790,
          unit: MeasurementUnit.MILLILITER_WATER,
          settled: false,
        },
      ],
      0x27
    ),
  ],
];

describe('sample checks', () => {
  describe.each(SAMPLES)('%s:', (_, buffer, pkt) => {
    it('should be parsed correctly', () => {
      expect(parse(buffer)).toStrictEqual(pkt);
    });

    it('should be serialized correctly', () => {
      expect(
        serialize({
          type: pkt.type,
          payload: pkt.payload,
        })
      ).toStrictEqual(buffer);
    });

    it('should symmetrically parse <-> serialize', () => {
      const parsed = parse(buffer);
      const serialized = serialize({
        type: pkt.type,
        payload: pkt.payload,
      });

      expect(pkt).toStrictEqual(parsed);
      expect(serialized).toStrictEqual(buffer);
    });
  });
});
