import Noble from 'noble'
import Assert from 'assert'
import Debug from 'debug'

const debug = Debug('run')

const connect = (lookFor = [], onConnect) => {
  const startScanning = (cb = () => {}) => {
    debug('startScanning')
    Noble.startScanning([], true, (error) => {
      debug('scanning...', error)
      Assert.ifError(error)
      cb(error)
    })
  }

  const stopScanning = (cb = () => {}) => {
    debug('stopScanning')
    if (Noble.state === 'poweredOff') {
      debug('was not scanning')
      return cb()
    }
    Noble.stopScanning(() => {
      debug('scanning stopped')
      cb()
    })
  }

  let lastPeripheral
  const onDiscover = (peripheral) => {
    debug('onDiscover', peripheral.uuid)
    const connect = (p) => {
      debug('connect', p.uuid)
      stopScanning(() => {
        debug('connecting to', p.uuid)
        p.connect((err) => {
          debug('connected', err)
          if (err) {
            return startScanning()
          }
          onConnect(peripheral)
          startScanning()
        })
      })
    }

    if (!peripheral.connectable) {
      debug('unconnectable')
      return startScanning()
    }

    if (lastPeripheral) {
      debug('disconnecting previous peripheral', lastPeripheral.uuid)
      lastPeripheral.disconnect((err) => {
        debug('lastPeripheral disconnected', err)
        Assert.ifError(err)
        connect(peripheral)
      })
    } else {
      connect(peripheral)
    }
    lastPeripheral = peripheral
  }

  const ignored = []
  Noble.on('discover', (p) => {
    debug('noble!discover %s', p.uuid)
    if (ignored.includes(p.uuid)) return
    if (lookFor.includes(p.uuid)) {
      debug('found', p.uuid)
      stopScanning(() => {
        onDiscover(p)
      })
    } else {
      debug('ignore', p.uuid)
      ignored.push(p.uuid)
    }
  })

  Noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
      startScanning()
    } else {
      stopScanning()
      Noble.stopScanning()
    }
  })
}

connect(['a1b3a2c71840'], (peripheral) => {
  console.log('CONNECTED!')
})

//
// noble.on("stateChange", function (state) {
//   if (state === "poweredOn") {
//     noble.startScanning(["a1b3a2c71840"], true);
//   } else {
//     noble.stopScanning();
//   }
// });
//
// noble.on("discover", (p) => {
//   if (
//     !p.advertisement.localName ||
//     !p.advertisement.localName.toLowerCase().startsWith("etekcity")
//   ) {
//     return;
//   }
//   noble.stopScanning();
//
//   p.connect((error) => {
//     console.log("noble.per#connect", p.uuid);
//     assert.ifError(error);
//
//     p.discoverAllServicesAndCharacteristics(
//       (error, services, characteristics) => {
//         assert.ifError(error);
//         const indicators = characteristics.filter((c) =>
//           c.properties.includes("indicate")
//         );
//
//         indicators.forEach(subscribe);
//       }
//     );
//   });
// });
//
// const subscribe = (c) => {
//   console.log("subscribe", c.uuid);
//   let lastData = Buffer.from([]);
//   c.on("data", (data) => {
//     if (lastData.equals(data)) {
//       return;
//     }
//     console.log(`[${c.uuid}] -> `, data);
//     lastData = data;
//   });
//
//   c.subscribe((error) => {
//     assert.ifError(error);
//   });
// };

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
