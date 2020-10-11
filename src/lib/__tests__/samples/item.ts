import { PacketType } from '../../types';
import { bx } from '../../utilities';
import { mkCase } from './_mkCase';

export default [
  mkCase('ITEM_STATE/true', PacketType.ITEM_STATE, [bx('00'), true], 0xe5),
  mkCase('ITEM_STATE/false', PacketType.ITEM_STATE, [bx('01'), false], 0xe6),
];
