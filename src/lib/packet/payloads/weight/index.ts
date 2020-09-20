import { Unit } from "./unit";
import {
  bufferReadBoolean,
  bufferReadSignedNumber,
  bufferWriteBoolean,
  bufferWriteSignedNumber,
} from "../../utilities";
import { PacketPayload } from "../index";

export interface WeightPayload extends PacketPayload {
  value: number;
  unit: Unit;
  settled: boolean;
}

export const parseWeightPayload = (buffer: Buffer): WeightPayload => ({
  value: bufferReadSignedNumber(buffer, 0),
  unit: buffer.readUInt8(3),
  settled: bufferReadBoolean(buffer, 4),
});

export const serializeWeightPayload = (payload: WeightPayload): Buffer => {
  const buffer = new Buffer(5);
  bufferWriteSignedNumber(buffer, payload.value, 0);
  buffer.writeUInt8(payload.unit, 3);
  bufferWriteBoolean(buffer, payload.settled, 4);
  return buffer;
};
