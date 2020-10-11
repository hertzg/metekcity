import { PayloadType } from '../../payloads';
import { IPacket } from '../../index';
import { bx } from '../../utilities';
import { HEADER } from '../../constants';

const PK = (
  type: number,
  payloads: [Buffer, PayloadType] | Buffer,
  checksum: number
): [Buffer, IPacket<PayloadType | Buffer>] => {
  let raw: string, payload: any, length: number;
  if (payloads == null || payloads instanceof Buffer) {
    if (payloads == null) {
      raw = '';
      payload = Buffer.alloc(0);
    } else {
      raw = payloads.toString('hex');
      payload = payloads;
    }
    length = payload.length;
  } else {
    raw = payloads[0].toString('hex');
    payload = payloads[1];
    length = payloads[0].length;
  }

  return [
    bx(
      [
        HEADER.toString('hex'),
        type.toString(16).padStart(2, '0'),
        length.toString(16).padStart(2, '0'),
        raw,
        checksum.toString(16).padStart(2, '0'),
      ].join('')
    ),
    {
      header: HEADER,
      type,
      length,
      payload,
      checksum,
    },
  ];
};

export const mkCase = (
  name: string,
  type: number,
  payloads: [Buffer, PayloadType] | Buffer,
  checksum: number
): [string, Buffer, IPacket<PayloadType | Buffer>] => [
  name,
  ...PK(type, payloads, checksum),
];
