[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fhertzg%2Fetekcity%2Fbadge%3Fref%3Dmaster&style=flat)](https://actions-badge.atrox.dev/hertzg/etekcity/goto?ref=master)
[![codecov](https://codecov.io/gh/hertzg/node-net-keepalive/branch/master/graph/badge.svg)](https://codecov.io/gh/hertzg/node-net-keepalive)

# ETEKCITY Smart Nutrition Scale

:warning: Very much work in progress :warning:

This is a potential project that tries to reverse engineer the BLE protocol that ETEKCITY Smart Nutrition Scale (ESN00)
uses.

[ETEKCITY Smart Nutrition Scale (ESN00)](https://www.etekcity.com/product/100334) ([DE](https://www.amazon.de/gp/product/B07RJV9QPF)
| [US](https://www.amazon.com/Etekcity-ESN00-Nutrition-Counting-Bluetooth/dp/B07FCZSC41))

![](https://image.etekcity.com/thumb/201810/28/7f248c75a139b66b9d0e6b081c25a0a1.jpg)

## BLE Protocol

This section describes the protocol (what was researched so far)

### BLE Services & Characteristics

```text
> Service: 00001910-0000-1000-8000-00805f9b34fb
>> Characteristic: 00002c10-0000-1000-8000-00805f9b34fb [READ]
>> Characteristic: 00002c11-0000-1000-8000-00805f9b34fb [WRITEWITHOUTRESPONSE, WRITE]
>> Characteristic: 00002c12-0000-1000-8000-00805f9b34fb [NOTIFY, INDICATE]
> Service: 0000180a-0000-1000-8000-00805f9b34fb
>> Characteristic: 00002a23-0000-1000-8000-00805f9b34fb [READ]
>> Characteristic: 00002a50-0000-1000-8000-00805f9b34fb [READ]
> Service: 00001800-0000-1000-8000-00805f9b34fb
>> Characteristic: 00002a00-0000-1000-8000-00805f9b34fb [READ]
>> Characteristic: 00002a01-0000-1000-8000-00805f9b34fb [READ]
```

Communication happens on service `0x1910`, device to client communication happens on `0x2c12` characteristic and client
to device communication on `0x2c12`

## Protocol

All packets have this structure

### Packet

![](https://kroki.io/packetdiag/svg/eNorSEzOTi1JyUxMV6jmUlAw0DW2UvBITUxJLbJWQAL6-grO-XnFJYl5JVYKBhVpqalpyQaJRkAdJlYKIZUFqQrRRfkliSWptkbmBrHWEB0BYLPB0kCFplYKPql56SUZaEqBCl0SSxKBkkA5oDotCDc6JzXP1jTWGtkJIAmwCmcPbwwLIY7MSE3OLi7N5arlAgALMjve)

#### Structure: Data

[Payload structure is defined in esn00-packet README](packages/esn00-packet/README.md)
