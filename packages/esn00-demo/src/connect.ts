import { IPacket, parse, PayloadType } from '@metekcity/esn00-packet';

export const connectService = async () => {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ name: 'Etekcity Nutrition Scale' }],
    optionalServices: [0x1800, 0x180a, 0x1910],
  });

  const gatt = await device.gatt!.connect();
  return gatt.getPrimaryService(0x1910);
};

export const connectChar = async (
  onPacket?: (packet: IPacket<PayloadType | ArrayBufferLike>) => void
) => {
  const service = await connectService();
  const char = await service.getCharacteristic(0x2c12);

  char.addEventListener('characteristicvaluechanged', (e) => {
    onPacket &&
      onPacket(parse(((e.target! as unknown as any).value as DataView).buffer));
  });

  await char.startNotifications();

  return char;
};
