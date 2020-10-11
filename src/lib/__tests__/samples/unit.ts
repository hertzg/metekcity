import { PacketType } from '../../types';
import { bx } from '../../utilities';
import { MeasurementUnit } from '../../payloads';
import { mkCase } from './_mkCase';

export default [
  mkCase(
    'SET_UNIT/g',
    PacketType.SET_UNIT,
    [bx('00'), MeasurementUnit.GRAM],
    0xc1
  ),
  mkCase(
    'SET_UNIT/ml',
    PacketType.SET_UNIT,
    [bx('02'), MeasurementUnit.MILLILITER_WATER],
    0xc3
  ),

  mkCase(
    'SET_UNIT/mlm',
    PacketType.SET_UNIT,
    [bx('04'), MeasurementUnit.MILLILITER_MILK],
    0xc5
  ),
  mkCase(
    'UNIT_STATE/g',
    PacketType.UNIT_STATE,
    [bx('00'), MeasurementUnit.GRAM],
    0xd2
  ),
  mkCase(
    'UNIT_STATE/ml',
    PacketType.UNIT_STATE,
    [bx('02'), MeasurementUnit.MILLILITER_WATER],
    0xd4
  ),
];
