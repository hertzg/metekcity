import {
  IMeasurement,
  MeasurementParselizer,
  MeasurementUnit,
} from '../../measurement';
import { bx } from '@hertzg/bx';

const SAMPLES = [
  [
    '-161 g',
    '01064a_00_01',
    {
      value: -1610,
      unit: 0,
      settled: true,
    },
  ],
  [
    '-161 ml',
    '01064a_02_01',
    {
      value: -1610,
      unit: 2,
      settled: true,
    },
  ],
  [
    '-157 mlm',
    '010622_04_01',
    {
      value: -1570,
      unit: 4,
      settled: true,
    },
  ],
  [
    '-5.7 floz',
    '01023a_03_01',
    {
      value: -570,
      unit: 3,
      settled: true,
    },
  ],
  [
    '-5.5 flozm',
    '010226_05_01',
    {
      value: -550,
      unit: 5,
      settled: true,
    },
  ],
  [
    '-5.7 oz',
    '01023a_06_01',
    {
      value: -570,
      unit: 6,
      settled: true,
    },
  ],
  [
    '-0:5.7 lboz',
    '01023a_01_01',
    {
      value: -570,
      unit: 1,
      settled: true,
    },
  ],
  [
    '450 g',
    '001194_00_01',
    {
      value: 4500,
      unit: 0,
      settled: true,
    },
  ],
  [
    '449 g',
    '00118a_00_01',
    {
      value: 4490,
      unit: 0,
      settled: true,
    },
  ],
  [
    '0:15.9 lboz',
    '000636_01_01',
    {
      value: 1590,
      unit: 1,
      settled: true,
    },
  ],
  [
    '449 ml',
    '00118a_02_01',
    {
      value: 4490,
      unit: 2,
      settled: true,
    },
  ],
  [
    '15.8 floz',
    '00062c_03_01',
    {
      value: 1580,
      unit: 3,
      settled: true,
    },
  ],
  [
    '449 mlm',
    '001108_04_01',
    {
      value: 4360,
      unit: 4,
      settled: true,
    },
  ],
  [
    '15.4 flozm',
    '000604_05_01',
    {
      value: 1540,
      unit: 5,
      settled: true,
    },
  ],
  [
    '38.1 oz',
    '000636_06_01',
    {
      value: 1590,
      unit: 6,
      settled: true,
    },
  ],
  [
    '-523 g',
    '01146e_00_01',
    {
      value: -5230,
      unit: 0,
      settled: true,
    },
  ],
  [
    '1079 g',
    '002a26_00_01',
    {
      value: 10790,
      unit: 0,
      settled: true,
    },
  ],
  [
    '2:6.1 lboz',
    '000ee2_01_01',
    {
      value: 3810,
      unit: 1,
      settled: true,
    },
  ],
  [
    '1079 ml',
    '002a26_02_01',
    {
      value: 10790,
      unit: 2,
      settled: true,
    },
  ],
  [
    '38.0 floz',
    '000ed8_03_01',
    {
      value: 3800,
      unit: 3,
      settled: true,
    },
  ],
  [
    '1048 mlm',
    '0028f0_04_01',
    {
      value: 10480,
      unit: 4,
      settled: true,
    },
  ],
  [
    '36.9 flozm',
    '000e6a_05_01',
    {
      value: 3690,
      unit: 5,
      settled: true,
    },
  ],
  [
    '38.1 oz',
    '000ee2_06_01',
    {
      value: 3810,
      unit: 6,
      settled: true,
    },
  ],
] as [string, string, unknown][];

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
