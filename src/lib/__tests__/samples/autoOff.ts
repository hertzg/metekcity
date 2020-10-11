import { PacketType } from '../../types';
import { bx } from '../../utilities';
import { mkCase } from './_mkCase';

export default [
  mkCase('SET_AUTO_OFF/2min', PacketType.SET_AUTO_OFF, [bx('78'), 0x78], 0x3d),
  mkCase(
    'AUTO_OFF_STATE/2min',
    PacketType.AUTO_OFF_STATE,
    [bx('0178'), 0x178],
    0x50
  ),
];
