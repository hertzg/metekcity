import { parseWeightPayload, serializeWeightPayload } from "./weight";
import { bx } from "../utilities";
import { Unit } from "./weight/unit";

describe("Weight", () => {
  it("should parse sample payload", () => {
    const w = parseWeightPayload(bx("01 06 4a 00 01"));
    expect(w).toBeTruthy();
    expect(w.value).toEqual(-1610);
    expect(w.unit).toEqual(Unit.GRAM);
    expect(w.settled).toEqual(true);
  });

  it("should serialize sample payload", () => {
    const b = serializeWeightPayload({
      value: -1610,
      unit: Unit.GRAM,
      settled: true,
    });
    expect(b).toEqual(bx("01 06 4a 00 01"));
  });
});
