import { bufferReadBoolean } from "../utilities";

export type ItemPayload = boolean;

export const parseItemPayload = (buffer: Buffer): ItemPayload =>
  bufferReadBoolean(buffer);
