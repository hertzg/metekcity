import { parseWeightPayload } from "./weight";
import { parseTarePayload } from "./tare";
import { parseErrorPayload } from "./error";
import { parseItemPayload } from "./item";
import { PacketType } from "../types";

export const PAYLOAD_PARSERS = Object.seal({
  [PacketType.ITEM]: {
    parse: parseItemPayload,
    serialize: () => {},
  },
  [PacketType.ERROR]: {
    parse: parseErrorPayload,
    serialize: () => {},
  },
  [PacketType.WEIGHT]: {
    parse: parseWeightPayload,
    serialize: () => {},
  },
  [PacketType.TARE]: {
    parse: parseTarePayload,
    serialize: () => {},
  },
});
