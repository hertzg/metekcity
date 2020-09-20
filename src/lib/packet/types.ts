export enum PacketType {
    SET_UNIT = 0xc0,
    SET_TARE = 0xc1,
    SET_NUTRITION = 0xc2,
    _PING_C3 = 0xc3,
    SET_AUTO_OFF = 0xc4,
    WEIGHT = 0xd0,
    UNIT = 0xd1,
    _UNKNOWN_D2 = 0xd2,
    TARE = 0xd3,
    _PONG_D4 = 0x0d4,
    AUTO_OFF = 0xd5,
    ERROR = 0xe0,
    _UNKNOWN_E1 = 0xe1,
    _UNKNOWN_E2 = 0xe2,
    _UNKNOWN_E3 = 0xe3,
    ITEM = 0xe4,
}

export type PacketTypesWithPayload = PacketType.ITEM | PacketType.ERROR;

export interface Packet<P extends Payload = Buffer> {
    header: Buffer;
    type: number;
    length: number;
    payload: P;
    checksum: number;
}