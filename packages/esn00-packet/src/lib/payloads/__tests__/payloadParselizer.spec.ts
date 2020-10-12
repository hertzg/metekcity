import PayloadParselizer from '../payloadParselizer';
import { bx } from '../../utilities';

jest.mock('../genericBoolean');
jest.mock('../genericUInt8');
jest.mock('../genericUInt16');
jest.mock('../measurement');

describe('PayloadParselizer', () => {
  it('should return null parsing or serializing unknown payload types', () => {
    const parselizer = new PayloadParselizer();

    expect(parselizer.parse(0xffff, bx('00010203'))).toBeNull();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(parselizer.serialize(0xffff, '' as any)).toBeNull();
  });
});
