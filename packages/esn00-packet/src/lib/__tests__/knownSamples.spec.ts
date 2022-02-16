import { parse, serialize } from '../parselize';
import SAMPLES from './knownSamples';
import { bx } from '@hertzg/bx';
import { arrayBufferToHexString } from '../utilities';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const groups = SAMPLES as any;

describe('Known sample checks', () => {
  describe.each(Object.keys(groups))('Group: %s', (groupKey: string) => {
    describe.each(groups[groupKey])(
      'Sample %s:',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (_, hex: string, pkt): void => {
        const buffer = bx(hex);

        it('should be parsed correctly', () => {
          const parsed = parse(bx(hex));

          expect(parsed).toBeTruthy();
          expect(typeof parsed).toBe('object');
          expect(parsed.header).toStrictEqual(bx(pkt.header));
          expect(parsed.type).toStrictEqual(pkt.type);
          expect(parsed.length).toStrictEqual(pkt.length);
          expect(parsed.payload).toStrictEqual(pkt.payload);
          expect(parsed.checksum).toStrictEqual(pkt.checksum);
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

          expect(pkt).toStrictEqual({
            ...parsed,
            header: arrayBufferToHexString(parsed.header),
          });
          expect(serialized).toStrictEqual(buffer);
        });
      }
    );
  });
});
