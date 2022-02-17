import {
  arrayBufferToHexString,
  MeasurementUnit,
  PacketType,
  serialize,
} from '@metekcity/esn00-packet/src/lib';
import { connectChar } from './connect';

const bx = (hex: string) => {
  if (hex === '') {
    return new ArrayBuffer(0);
  }
  const cleanHex = hex.replace(/[^0-9a-f]/g, '');
  if (cleanHex.length === 0 || cleanHex.length % 2 !== 0) {
    throw new TypeError(
      'hex string must yield non zero positive even number of characters'
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const data = cleanHex.match(/../g)!.map((hex) => parseInt(hex, 16));
  return new Uint8Array(data).buffer;
};

let writeChar: BluetoothRemoteGATTCharacteristic;
let readChar: BluetoothRemoteGATTCharacteristic;

const handleRunClick = async () => {
  let lastData = '';
  readChar = await connectChar((packet) => {
    const { type, payload } = packet;

    if (type === PacketType.MEASUREMENT) {
      const curData = arrayBufferToHexString(serialize(packet as any)!);
      if (lastData !== curData) {
        console.log(
          `[0x2c12][${Number(type).toString(16).padStart(2, '0')}][${
            PacketType[type]
          }]`,
          payload
        );
      }
      lastData = curData;
    } else if (!(payload instanceof ArrayBuffer)) {
      console.log(
        `[READ][${Number(type).toString(16).padStart(2, '0')}][${
          PacketType[type]
        }]`,
        payload
      );
    }
  });

  writeChar = await readChar.service.getCharacteristic(0x2c11);

  unitEl.removeAttribute('disabled');
  document.getElementById('set-unit')!.removeAttribute('disabled');
  document.getElementById('set-tare-true')!.removeAttribute('disabled');
  document.getElementById('set-tare-false')!.removeAttribute('disabled');
  document.getElementById('write')!.removeAttribute('disabled');
  document.getElementById('write-type')!.removeAttribute('disabled');
  document.getElementById('write-payload')!.removeAttribute('disabled');
  document.getElementById('write-raw')!.removeAttribute('disabled');
};
document.getElementById('run')!.addEventListener('click', handleRunClick);

const unitEl = document.getElementById('unit')!;
Object.entries(MeasurementUnit)
  .filter(([k, v]) => typeof v === 'number')
  .forEach(([k, v]) => {
    const option = document.createElement('option');
    option.value = String(v);
    option.appendChild(document.createTextNode(k));
    unitEl.appendChild(option);
  });

const write = async ({ type, payload }: any) => {
  const buffer = serialize({ type: Number(type), payload: payload })!;
  await writeChar!.writeValue(buffer);
  console.log(
    `[WRITE][${Number(type).toString(16).padStart(2, '0')}][${
      PacketType[type]
    }][${payload}] ${arrayBufferToHexString(buffer)}`
  );
};

const handleSetUnit = async () => {
  const value = Number((<HTMLSelectElement>unitEl).value);
  await write({ type: PacketType.SET_UNIT, payload: value });
};
document.getElementById('set-unit')!.addEventListener('click', handleSetUnit);

const handleTareSet = async (value: boolean) => {
  await write({ type: PacketType.SET_TARE, payload: value });
};

document
  .getElementById('set-tare-true')!
  .addEventListener('click', () => handleTareSet(true));

document
  .getElementById('set-tare-false')!
  .addEventListener('click', () => handleTareSet(false));

const writeTypeEl = document.getElementById('write-type')!;
Object.entries(PacketType)
  .filter(([k, v]) => typeof v === 'number')
  .forEach(([k, v]) => {
    const option = document.createElement('option');
    option.value = String(v);
    option.appendChild(document.createTextNode(k));
    writeTypeEl.appendChild(option);
  });

const handleWrite = async (type: string, payload: string, isHex: boolean) => {
  const data = {
    type: Number(type),
    payload: isHex ? bx(payload) : JSON.parse(payload),
  };
  await write(data);

  document.getElementById('write-payload')!.focus();
};

document
  .getElementById('write')!
  .addEventListener('click', () =>
    handleWrite(
      (document.getElementById('write-type') as HTMLSelectElement).value,
      (document.getElementById('write-payload') as HTMLTextAreaElement).value,
      (document.getElementById('write-raw') as HTMLInputElement).checked
    )
  );
