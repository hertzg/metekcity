import { bufferReadBoolean } from "../utilities";

export type ErrorPayload = boolean;

export const parseErrorPayload = (buffer: Buffer): ErrorPayload =>
  bufferReadBoolean(buffer);
