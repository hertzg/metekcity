import { PacketType } from '../../types';
import { bx } from '../../utilities';
import { mkCase } from './_mkCase';

export default [
  mkCase('SET_TARE/true', PacketType.SET_TARE, [bx('00'), false], 0xc2),
  mkCase('SET_TARE/false', PacketType.SET_TARE, [bx('01'), true], 0xc3),

  mkCase('TARE_STATE/true', PacketType.TARE_STATE, [bx('00'), true], 0xd4),
  mkCase('TARE_STATE/false', PacketType.TARE_STATE, [bx('01'), false], 0xd5),
];
