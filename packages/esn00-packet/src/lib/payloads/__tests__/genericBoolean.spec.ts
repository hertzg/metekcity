import { bx } from '@hertzg/bx';
import { BooleanParselizer } from '../genericBoolean';

const parse = (payload: Buffer, invert?: boolean): boolean =>
  new BooleanParselizer(invert).parse(payload);

const serialize = (payload: boolean, invert?: boolean): Buffer =>
  new BooleanParselizer(invert).serialize(payload);

describe('boolean payloads', () => {
  it('should be able to parse boolean values', () => {
    expect(parse(bx('01'))).toStrictEqual(true);
    expect(parse(bx('0100'))).toStrictEqual(true);
    expect(parse(bx('1000'))).toStrictEqual(true);
    expect(parse(bx('0001'))).toStrictEqual(false);
    expect(parse(bx('00210001'))).toStrictEqual(false);
  });

  it('should be able to serialize boolean values', () => {
    expect(serialize(true)).toStrictEqual(bx('01'));
    expect(serialize(false)).toStrictEqual(bx('00'));
  });

  it('should consistently parse <-> serialize', () => {
    const assertCase = (hex: string, value: boolean) => {
      const buffer = bx(hex);
      const payload = value;

      const serialized = serialize(payload);
      const parsed = parse(buffer);

      expect(buffer).toStrictEqual(serialized);
      expect(payload).toStrictEqual(parsed);
    };

    assertCase('00', false);
    assertCase('01', true);
  });

  it('should be able to invert the logic', () => {
    expect(serialize(true, true)).toStrictEqual(serialize(false));
    expect(serialize(false, true)).toStrictEqual(serialize(true));
    expect(parse(bx('01'), true)).toStrictEqual(parse(bx('00')));
    expect(parse(bx('00'), true)).toStrictEqual(parse(bx('01')));
    expect(parse(bx('ff'), true)).toStrictEqual(parse(bx('00')));
  });
});
