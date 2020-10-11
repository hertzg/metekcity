import {
  IMeasurement,
  MeasurementParselizer,
  MeasurementUnit,
} from '../../measurement';
import { bx } from '../../../utilities';
import JSON_SAMPLES from './samples.json';

const SAMPLES: Array<[
  name: string,
  hex: string,
  expected: any
]> = JSON_SAMPLES as any;

const parse = (payload: Buffer): IMeasurement =>
  new MeasurementParselizer().parse(payload);

const serialize = (payload: IMeasurement): Buffer =>
  new MeasurementParselizer().serialize(payload);

describe('Weight', () => {
  it('should parse and serialize consistently', () => {
    const buffer = bx('01064a 00 01');
    const payload = { value: -1610, unit: MeasurementUnit.GRAM, settled: true };

    const serialized = serialize(payload);
    const parsed = parse(buffer);

    expect(buffer).toStrictEqual(serialized);
    expect(payload).toStrictEqual(parsed);
  });

  describe('Recorded sample checks', () => {
    it.each(SAMPLES)('Sample %s: %s -> %j', (_, hex, expected) => {
      const w = parse(bx(hex));
      expect(w).toStrictEqual(expected);
    });
  });
});
