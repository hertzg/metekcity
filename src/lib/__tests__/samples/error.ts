import { PacketType } from '../../types';
import { bx } from '../../utilities';
import { mkCase } from './_mkCase';

export default [
  mkCase('ERROR_STATE/true', PacketType.ERROR_STATE, [bx('00'), true], 0xe1),
  mkCase('ERROR_STATE/false', PacketType.ERROR_STATE, [bx('01'), false], 0xe2),
];
