import { bufferReadBoolean } from "../utilities";

export type TarePayload = boolean;

export const parseTarePayload = (buffer: Buffer): TarePayload =>
  bufferReadBoolean(buffer);
