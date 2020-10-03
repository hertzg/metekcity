import { bx } from '../../utilities';
import { BooleanParselizer } from '../genericBoolean';

const parse = (payload) => new BooleanParselizer().parse(payload);

const serialize = (payload): Buffer =>
  new BooleanParselizer().serialize(payload);

describe('boolean payloads', () => {
  it('should be able to parse boolean values', () => {
    expect(parse(bx('01'))).toStrictEqual(true);
    expect(parse(bx('0100'))).toStrictEqual(true);
    expect(parse(bx('0100'))).toStrictEqual(true);
    expect(parse(bx('0001'))).toStrictEqual(false);
    expect(parse(bx('00210001'))).toStrictEqual(false);
  });

  it('should be able to serialize boolean values', () => {
    expect(serialize(true)).toStrictEqual(bx('01'));
    expect(serialize(false)).toStrictEqual(bx('00'));
  });

  it('should consistently parse <-> serialize', () => {
    const assertCase = (hex, value) => {
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
});
