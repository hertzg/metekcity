So far the `notes.txt` contains samples saved during research, this issue tries to collect the status of implementation of each packet type. Some of them might need their own issue but here they are represented all togeather.

# Packet Types:

- [x] `SET_UNIT` (`0xc0`)
- [x] `SET_TARE` (`0xc1`)
- [ ] `SET_NUTRITION` (`0xc2`)
- [ ] `?PING` (`0xc3`)
- [x] `SET_AUTO_OFF` (`0xc4`)
- [x] `MEASUREMENT` (`0xd0`)
- [ ] `UNIT_STATE` (`0xd1`)
- [ ] `???` (`0xd2`)
- [x] `TARE_STATE` (`0xd3`)
- [ ] `?PONG` (`0xd4`)
- [x] `AUTO_OFF_STATE` (`0xd5`)
- [x] `ERROR_STATE` (`0xe0`)
- [ ] `???` (`0xe1`)
- [ ] `???` (`0xe2`)
- [ ] `???` (`0xe3`)
- [x] `ITEM_STATE` (`0xe4`)

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
| ⌛     | `UNIT_STATE`     | `NOTIFY`  | `unit`                  | `uint8Parselizer`              |                                                                         |
| ⌛     | `SET_NUTRITION`  | `COMMAND` | (complex object)        |                                |                                                                         |
| ⌛     | `PING`           | `COMMAND` | N/A                     |                                | not sure what this is, maybe a wakeup request?                          |
| ⌛     | `PONG`           | `NOTIFY`  | N/A                     |                                | not sure what this is, maybe a wakeup response?                         |

## Legend

| Marker    | Category  | Description                           |
| --------- | --------- | ------------------------------------- |
| ⌛        | Status    | Waiting (todo)                        |
| ✅        | Status    | Done                                  |
| `COMMAND` | Source(s) | Command send to the Device            |
| `NOTIFY`  | Source(s) | Notification received from the Device |
