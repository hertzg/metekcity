import { bx } from '../utilities';
import { parsePacket } from '../parsePacket';
import { parse } from '../parselize';
import { HEADER } from '../constants';

jest.mock('../serializePacket');
jest.mock('../parsePacket');

const mockedParsePacket = parsePacket as jest.MockedFunction<
  typeof parsePacket
>;

describe('Parselizer', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should parse unknown payloads as buffer', () => {
    const buffer = bx('feefc0a2_ff_04_00010203_ee');
    const packet = {
      header: HEADER,
      type: 0xff,
      length: 4,
      payload: bx('00010203'),
      checksum: 0xee,
    };

    const mockedParselizerParse = jest.fn();
    mockedParsePacket.mockReturnValue(packet);
    mockedParselizerParse.mockReturnValue(null);

    const parsed = parse(buffer, {
      parse: mockedParselizerParse,
    });
    expect(parsed).toStrictEqual(packet);
    expect(mockedParsePacket).toBeCalledWith(buffer);
    expect(mockedParselizerParse).toBeCalled();
  });
});
