export enum PacketType {
  SET_UNIT = 0xc0, // 192
  SET_TARE = 0xc1, // 193
  SET_NUTRITION = 0xc2, // 194
  _PING_C3 = 0xc3, // 195
  SET_AUTO_OFF = 0xc4, // 196
  MEASUREMENT = 0xd0, // 208
  UNIT_STATE = 0xd1, // 209
  _UNKNOWN_D2 = 0xd2, // 210
  TARE_STATE = 0xd3, // 211
  _PONG_D4 = 0x0d4, // 212
  AUTO_OFF_STATE = 0xd5, // 213
  ERROR_STATE = 0xe0, // 224
  _UNKNOWN_E1 = 0xe1, // 225
  _UNKNOWN_E2 = 0xe2, // 226
  _UNKNOWN_E3 = 0xe3, // 227
  ITEM_STATE = 0xe4, // 228
}
