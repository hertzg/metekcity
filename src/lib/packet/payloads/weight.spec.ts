import { HEADER } from "../constants";
import { parseWeightPayload } from "./weight";
import { bx } from "../utilities";
import { Sign } from "./weight/sign";

describe("Weight", () => {
  it("should parse sample payload", () => {
    const w = parseWeightPayload(bx("01 06 4a 00 01"));
    expect(w).toBeTruthy();
    expect(w.sign).toEqual(Sign.NEGATIVE);
    expect(w.value).toEqual(bx("06 4a"));
    expect(w.settled).toEqual(true);
  });
});
