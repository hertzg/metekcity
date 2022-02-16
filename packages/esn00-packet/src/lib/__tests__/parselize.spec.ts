import { bx } from '@hertzg/bx';
import { parsePacket } from '../parsePacket';
import { serializePacket } from '../serializePacket';
import { parse, serialize } from '../parselize';
import { HEADER } from '../constants';
import { ISerializablePacket, PayloadType } from '../index';

jest.mock('../serializePacket');
jest.mock('../parsePacket');

const mockedParsePacket = parsePacket as jest.MockedFunction<
  typeof parsePacket
>;

const mockedSerializePacket = serializePacket as jest.MockedFunction<
  typeof serializePacket
>;

describe('Parselizer', () => {
  describe('parse', () => {
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

  describe('serialize', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    const setupSerialize = () => {
      const mockedParselizerSerialize = jest.fn();
      const boundSerialize = (pkt: ISerializablePacket<Buffer | PayloadType>) =>
        serialize(pkt, {
          serialize: mockedParselizerSerialize,
        });

      return [
        boundSerialize,
        mockedParselizerSerialize,
        mockedSerializePacket,
      ] as const;
    };

    it('should serialize unknown packets with buffer payloads', () => {
      const [boundSerialize, mockedParselizerSerialize, mockedSerializePacket] =
        setupSerialize();

      const packet = {
        type: 0xff,
        payload: bx('00010203'),
      };
      const buffer = bx('feefc0a2_ff_04_00010203_09');

      mockedSerializePacket.mockReturnValue(buffer);
      boundSerialize(packet);

      expect(mockedSerializePacket).toBeCalledWith(packet);
      expect(mockedParselizerSerialize).not.toBeCalled();
    });

    it('should throw when trying to serialize unknown packets with non buffer payload', () => {
      const [boundSerialize, mockedParselizerSerialize, mockedSerializePacket] =
        setupSerialize();

      const packet = {
        type: 0xff,
        payload: 'some random payload',
      };

      mockedParselizerSerialize.mockReturnValue(null);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => boundSerialize(packet)).toThrow(
        /^Tried to serialize packet of unknown type/
      );
      expect(mockedParselizerSerialize).toBeCalledWith(
        packet.type,
        packet.payload
      );
      expect(mockedSerializePacket).not.toBeCalled();
    });
  });
});
