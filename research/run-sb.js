'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const sblendid_1 = __importDefault(require('@sblendid/sblendid'));
(async () => {
  const sblendid = await sblendid_1.default.powerOn();
  sblendid.startScanning((peripheral) => {
    const { uuid, name, connectable, advertisement } = peripheral;
    const { txPowerLevel, manufacturerData, serviceUUIDs } = advertisement;
    console.log('Found Peripheral:');
    console.log(uuid, name, connectable);
    console.log(txPowerLevel, manufacturerData, serviceUUIDs);
  });
  // You need to power off your Bluetooth adapter or your Node process won't end
  // Note the lower case "s", powerOff is a static and an instance method
  await sblendid.powerOff();
})();
