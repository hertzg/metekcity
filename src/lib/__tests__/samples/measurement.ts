import { PacketType } from '../../types';
import { bx } from '../../utilities';
import { MeasurementUnit } from '../../payloads';
import { mkCase } from './_mkCase';

export default [
  mkCase(
    'MEASUREMENT/g/settled/-523',
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
  mkCase(
    'MEASUREMENT/mlw/notSettled/1079',
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
];
