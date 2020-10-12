# ETEKCITY ESN00 Packets

Parses & serializes packets to and from the format that ESN00 sends and understands.

# Implemented Packet Types:

- [x] `SET_UNIT` (`0xc0`) - c5736b4, - #2
- [x] `SET_TARE` (`0xc1`) - #2
- [x] `SET_AUTO_OFF` (`0xc4`) - 805a076, #2
- [x] `MEASUREMENT` (`0xd0`) - bfcf5df
- [x] `UNIT_STATE` (`0xd1`) - #5 
- [x] `TARE_STATE` (`0xd3`) - bfcf5df, #3
- [x] `AUTO_OFF_STATE` (`0xd5`) - #2
- [x] `ERROR_STATE` (`0xe0`) - bfcf5df, #3
- [x] `ITEM_STATE` (`0xe4`) - bfcf5df, #3

# Unresearched packets

- `SET_NUTRITION` (`0xc2`)
-  `?PING` (`0xc3`)
-  `???` (`0xd2`)
-  `?PONG` (`0xd4`)
-  `???` (`0xe1`)
-  `???` (`0xe2`)
-  `???` (`0xe3`)

## Protocol

All packets have this structure

![](https://kroki.io/packetdiag/svg/eNorSEzOTi1JyUxMV6jmUlAw0DW2UvBITUxJLbJWQAL6-grO-XnFJYl5JVYKBhVpqalpyQaJRkAdJlYKIZUFqQrRRfkliSWptkbmBrHWEB0BYLPB0kCFplYKPql56SUZaEqBCl0SSxKBkkA5oDotCDc6JzXP1jTWGtkJIAmwCmcPbwwLIY7MSE3OLi7N5arlAgALMjve)

#### Data Packet: Weight Measurement (0xE0)

Device will be constantly spamming packet with this data

![](https://kroki.io/packetdiag/svg/eNorSEzOTi1JyUxMV6jmUlDIy09Jjc9IzUzPKFGwVTAzsOYCCmopBGem5ylAQHROap6toY5CUX5JYkmqrZG5Qaw1SFxfH6wKrDwcYgBcuRFECTIAKoeoAmsIzcssKSZoPkgVxDkliUk5qQSdk1pSkpOawlXLxcUFAOOQPE8=)

| Field  | Description                                                                                 | Note                                                            |
| ------ | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Sign   | `0x00` (positive) / `0x01` (negative)                                                       |                                                                 |
| Weight | 16 bit int (big-endian)                                                                     | In grams value is multiplied by 10 (not sure about other units) |
| Unit   | `0x00`(g),`0x02`(ml),`0x04`(ml milk),`0x03`(floz),`0x05`(floz milk),`0x06`(oz),`0x01`(lboz) | Does not seem like bitmask just enum                            |
| Stable | `0x00` (measuring) / `0x01` (settled)                                                       | `0x00` means weight is not yet settled                          |



# Packet Details

| Status | Type             | Source(s) | Payload                 | Generic?                       | Notes                                                                   |
| ------ | ---------------- | --------- | ----------------------- | ------------------------------ | ----------------------------------------------------------------------- |
| ✅     | `SET_UNIT`       | `COMMAND` | `unit`                  | `uint8Parselizer`              |                                                                         |
| ✅     | `SET_TARE`       | `COMMAND` | `shouldReset`           | `booleanParselizer`            |                                                                         |
| ✅     | `SET_AUTO_OFF`   | `COMMAND` | `timeout`               | `uint8Parselizer`              |                                                                         |
| ✅     | `MEASUREMENT`    | `NOTIFY`  | `sign`, `value`, `unit` | `uint8Parselizer`              |                                                                         |
| ✅     | `TARE_STATE`     | `NOTIFY`  | `isOn`                  | `booleanParselizer` (inverted) |                                                                         |
| ✅     | `AUTO_OFF_STATE` | `NOTIFY`  | `timeout`               | `uint16Parselizer`             | the value is the same as for command with the exception of extra 0 byte |
| ✅     | `ERROR_STATE`    | `NOTIFY`  | `isOn`                  | `booleanParselizer` (inverted) |                                                                         |
| ✅     | `ITEM_STATE`     | `NOTIFY`  | `isOn`                  | `booleanParselizer` (inverted) |                                                                         |
| ✅     | `UNIT_STATE`     | `NOTIFY`  | `unit`                  | `uint8Parselizer`              |                                                                         |
| 🛑      | `SET_NUTRITION`  | `COMMAND` | (complex object)        |                                |                                                                         need more samples to understad how data is encoded |

## Legend

| Marker    | Category  | Description                           |
| --------- | --------- | ------------------------------------- |
| ⌛        | Status    | Waiting (todo)                        |
| 🛑         | Status    | Blocked                        |
| ✅        | Status    | Done                                  |
| `COMMAND` | Source(s) | Command send to the Device            |
| `NOTIFY`  | Source(s) | Notification received from the Device |
