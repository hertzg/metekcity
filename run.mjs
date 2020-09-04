import noble from "noble";
import assert from "assert";

noble.on("stateChange", function (state) {
  console.log("noble!discover");
  if (state === "poweredOn") {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on("discover", (p) => {
  if (
    !p.advertisement.localName ||
    !p.advertisement.localName.toLowerCase().startsWith("etekcity")
  ) {
    return;
  }

  console.log("noble!discover");

  p.connect((error) => {
    console.log("noble.per#connect");
    assert.ifError(error);

    p.discoverAllServicesAndCharacteristics(
      (error, services, characteristics) => {
        assert.ifError(error);
        const indicators = characteristics.filter((c) =>
          c.properties.includes("indicate")
        );

        indicators.forEach(subscribe);
      }
    );
  });
});

const subscribe = (c) => {
  console.log("subscribe", c.uuid);
  let lastData = Buffer.from([]);
  c.on("data", (data) => {
    if (lastData.equals(data)) {
      return;
    }
    console.log(`[${c.uuid}] -> `, data);
    lastData = data;
  });

  c.subscribe((error) => {
    assert.ifError(error);
  });
};

// (async () => {
//     const peripheral = await Sblendid.connect("45-B9-93-28-72:8C");
//     const service = await peripheral.getService("uuid");
//
//     const value = await service.read("uuid");
//     await service.write("uuid", Buffer.from("value", "utf8"));
//     service.on("uuid", value => console.log(value));
//
//     // You need to power off your Bluetooth adapter or your Node process won't end
//     await Sblendid.powerOff();
// })();
