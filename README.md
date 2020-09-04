# ETEKCITY Smart Nutrition Scale

This is a potential project that tries to reverse engineer the BLE protocol that
ETEKCITY Smart Nutrition Scale (ESN00) uses.

## BLE Protocol

This section describes the protocol (what was researched so far)

### Finding device

Device address is random so the way to find it is based on the advertisement name (tested) or manufacturer data (not tested)
Device reports weight and status on service `1801` and characteristic `2c12`.

## Protocol

All packets have this structure

![](https://kroki.io/packetdiag/svg/eNorSEzOTi1JyUxMV6jmUlAw0DW2UvBITUxJLbJWQAL6-grO-XnFJYl5JVYKBhVpqalpyQaJRkAdJlYKIZUFqQrRRfkliSWptkbmBrHWEB0BYLPB0kCFplYKPql56SUZaEqBCl0SSxKBkkA5oDotCDc6JzXP1jTWGtkJIAmwCmcPbwwLIY7MSE3OLi7N5arlAgALMjve)

### Data Packets

Data packet depends on the packet type values:

| Name    | Value | Length  | When                                  | What                                                                                                                                                                                                          |
| ------- | :---: | :-----: | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Error   | `E0`  | 1 byte  | Error mode is triggered or reset      | `0x00` (error reset) / `0x01` (error triggered)                                                                                                                                                               |
| Tare    | `D3`  | 1 byte  | Tare is updated (set) or reset        | `0x00` (no tare) / `0x01` (tare mode)                                                                                                                                                                         |
| Item    | `E4`  | 1 byte  | Item is put or removed from the scale | `0x00` (has item) / `0x01` (no item)                                                                                                                                                                          |
| Weight  | `D0`  | 5 bytes | Weight is measuring or stabilized     | ![](https://kroki.io/packetdiag/svg/eNorSEzOTi1JyUxMV6jmUlDIy09Jjc9IzUzPKFGwVTAzsOYCCmopBGem5ylAQHROap6toY5CUX5JYkmqrZG5Qaw1SFxfH6wKrDwcYgBcuRFECTIAKoeoAmsIzcssKSZoPkgVxDkliUk5qQSdk1pSkpOawlXLxcUFAOOQPE8=) |
| Unknown | `D2`  | 1 byte  | Characteristic listening started      | Unknown (maybe nutrition value states)                                                                                                                                                                        |

#### Data Packet: Weight Measurement (0xE0)

Device will be constantly spamming packet with this data

![](https://kroki.io/packetdiag/svg/eNorSEzOTi1JyUxMV6jmUlDIy09Jjc9IzUzPKFGwVTAzsOYCCmopBGem5ylAQHROap6toY5CUX5JYkmqrZG5Qaw1SFxfH6wKrDwcYgBcuRFECTIAKoeoAmsIzcssKSZoPkgVxDkliUk5qQSdk1pSkpOawlXLxcUFAOOQPE8=)

| Field  | Description                                                                                 | Note                                                            |
| ------ | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Sign   | `0x00` (positive) / `0x01` (negative)                                                       |                                                                 |
| Weight | 16 bit int (big-endian)                                                                     | In grams value is multiplied by 10 (not sure about other units) |
| Unit   | `0x00`(g),`0x02`(ml),`0x04`(ml milk),`0x03`(floz),`0x05`(floz milk),`0x06`(oz),`0x01`(lboz) | Does not seem like bitmask just enum                            |
| Stable | `0x00` (measuring) / `0x01` (settled)                                                       | `0x00` means weight is not yet settled                          |

## Hardware

Nothing too interesting...

![](/research/hardware/esn00/photo_2020-09-04_01-17-35.jpg | width=100)
![](/research/hardware/esn00/photo_2020-09-04_01-17-34.jpg | width=100)
