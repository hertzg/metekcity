"use strict";
exports.__esModule = true;
exports.UInt8Parselizer = void 0;
var UInt8Parselizer = /** @class */ (function () {
    function UInt8Parselizer() {
        var _this = this;
        this.offset = 0;
        this.parse = function (buffer) { return buffer.readUInt8(_this.offset); };
        this.serialize = function (payload) {
            var buffer = Buffer.alloc(1 + _this.offset);
            buffer.writeUInt8(payload, _this.offset);
            return buffer;
        };
    }
    return UInt8Parselizer;
}());
exports.UInt8Parselizer = UInt8Parselizer;
