proto = Proto("etekcity", "ETEK City")

local typeTable = {
    [0xc0] = "SET UNIT",
    [0xc1] = "SET TARE",
    [0xc2] = "SET NUTRITION",
    [0xc3] = "PING?",
    [0xc4] = "SET AUTOFF",
    [0xd0] = "WEIGHT",
    [0xd1] = "UNIT",

    [0xd3] = "TARE",
    [0xd4] = "PONG?",
    [0xd5] = "AUTOFF",
    [0xe0] = "ERROR",


    [0xe4] = "ITEM",
}

f_header = ProtoField.bytes("etekcity.header", "Header")
f_type = ProtoField.uint8('etekcity.type', 'Type', base.HEX, typeTable)
f_length = ProtoField.uint8('etekcity.length', 'Length', base.DEC)
f_data = ProtoField.bytes("etekcity.data", "Data")
f_checksum = ProtoField.uint8('etekcity.checksum', 'Checksum', base.HEX)

f_data_sleepTimeout = ProtoField.uint8('etekcity.sleepTimeout', 'Sleep Timeout', base.DEC)

proto.fields = {
    f_header,
    f_type,
    f_length,
    f_data,
    f_data_sleepTimeout,
    f_checksum
}

function proto.dissector(buffer, pinfo, tree)
    length = buffer:len()
    if length == 0 then
        return
    end

    pinfo.cols.protocol = proto.name

    local subtree = tree:add(proto, buffer(), "Scale Protocol Data")
    subtree:add_le(f_header, buffer(0, 4))

    local pktType = buffer(4, 1):uint();
    subtree:add_le(f_type, buffer(4, 1))

    subtree:add_le(f_length, buffer(5, 1))
    local dataLength = buffer(5, 1):uint();
    local offset = 6
    if dataLength > 0 then
        subtree:add_le(f_data, buffer(offset, math.min(dataLength, 32 - offset)))
    end

    offset = offset + dataLength
    subtree:add_le(f_checksum, buffer(offset, 1))
end

local btUUID = DissectorTable.get("bluetooth.uuid")
btUUID:add('2c11', proto)
btUUID:add('2c12', proto)