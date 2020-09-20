import Sblendid from "@sblendid/sblendid";

(async () => {
  const sblendid = await Sblendid.powerOn();
  sblendid.startScanning((peripheral) => {
    const { uuid, name, connectable, advertisement } = peripheral;
    const { txPowerLevel, manufacturerData, serviceUUIDs } = advertisement;

    console.log("Found Peripheral:");
    console.log(uuid, name, connectable);
    console.log(txPowerLevel, manufacturerData, serviceUUIDs);
  });

  // You need to power off your Bluetooth adapter or your Node process won't end
  // Note the lower case "s", powerOff is a static and an instance method
  await sblendid.powerOff();
})();
