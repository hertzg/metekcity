import { bufferReadBoolean, bx } from '../utilities';

describe('Utilities', () => {
  describe('bx', () => {
    it('should convert hex strings to buffer', () => {
      expect(bx('feef')).toEqual(Buffer.from([0xfe, 0xef]));
      expect(bx('feeffaaf')).toEqual(Buffer.from([0xfe, 0xef, 0xfa, 0xaf]));
    });
    it('should convert hex strings with separators to buffer', () => {
      expect(bx('fe_ef af be b0 xba-ab')).toEqual(
        Buffer.from([0xfe, 0xef, 0xaf, 0xbe, 0xb0, 0xba, 0xab])
      );
    });
    it('should throw on invalid strings', () => {
      expect(() => bx('zz')).toThrowError(TypeError);
      expect(() => bx('0')).toThrowError(TypeError);
      expect(() => bx('1')).toThrowError(TypeError);
      expect(() => bx('deadbea')).toThrowError(TypeError);
    });
  });

  describe('bufferReadBoolean', () => {
    it('should treat any non zero value as true', () => {
      expect(bufferReadBoolean(bx('00'))).toBe(false);
      expect(bufferReadBoolean(bx('0001'))).toBe(false);
      expect(bufferReadBoolean(bx('0001'), 1)).toBe(true);
      expect(bufferReadBoolean(bx('01'))).toBe(true);
      expect(bufferReadBoolean(bx('05'))).toBe(true);
      expect(bufferReadBoolean(bx('00ff'), 1)).toBe(true);
      expect(bufferReadBoolean(bx('00ff00'), 1)).toBe(true);
    });
  });
});
