import {Packet, PacketType, PacketTypesWithPayload} from "./types";
import {ParseablePacketType, PAYLOAD_PARSERS} from "./payloads";
import {parsePacket} from "./parse";

export const serializePacket = (pkt: Packet): Packet => {
    const header = buffer.slice(0, 4);
    const type = buffer.readUInt8(4);
    const length = buffer.readUInt8(5);
    const payload = buffer.slice(6, 6 + length);
    const checksum = buffer.readUInt8(6 + length);

    return {
        header,
        type,
        length,
        payload,
        checksum,
    };
};


export const serializePayload = (
    type: ParseablePacketType,
    b: Payload
): ReturnType<typeof PAYLOAD_PARSERS[ParseablePacketType]> => {
    return PAYLOAD_PARSERS[type](b);
};

export const parse = (buffer: Buffer) => {
    const pkt = parsePacket(buffer);

    switch (pkt.type) {
        case PacketType.ITEM:
        case PacketType.ERROR:
        case PacketType.TARE:
        case PacketType.WEIGHT:
            return {
                ...pkt,
                payload: parsePayload(pkt.type, pkt.payload),
            };
        default:
            return pkt;
    }
};