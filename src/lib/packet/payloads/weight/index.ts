import { Unit } from "./unit";
import { Sign } from "./sign";

export interface WeightPayload {
  sign: Sign;
  value: Buffer;
  unit: Unit;
  settled: boolean;
}

export const parseWeightPayload = (buffer: Buffer): WeightPayload => ({
  sign: buffer.readUInt8(0),
  value: buffer.slice(1, 3),
  unit: buffer.readUInt8(4),
  settled: Boolean(buffer.readUInt8()),
});
