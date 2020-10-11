import { parse, serialize } from '../parselize';
import SAMPLES from './samples';

describe('sample checks', () => {
  describe.each(SAMPLES)('%s:', (_, buffer, pkt) => {
    it('should be parsed correctly', () => {
      expect(parse(buffer)).toStrictEqual(pkt);
    });

    it('should be serialized correctly', () => {
      expect(
        serialize({
          type: pkt.type,
          payload: pkt.payload,
        })
      ).toStrictEqual(buffer);
    });

    it('should symmetrically parse <-> serialize', () => {
      const parsed = parse(buffer);
      const serialized = serialize({
        type: pkt.type,
        payload: pkt.payload,
      });

      expect(pkt).toStrictEqual(parsed);
      expect(serialized).toStrictEqual(buffer);
    });
  });
});
