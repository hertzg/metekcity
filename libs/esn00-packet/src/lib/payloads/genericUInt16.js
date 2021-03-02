"use strict";
exports.__esModule = true;
exports.UInt16Parselizer = void 0;
var utilities_1 = require("../utilities");
var UInt16Parselizer = /** @class */ (function () {
    function UInt16Parselizer() {
        var _this = this;
        this.offset = 0;
        this.parse = function (buffer) { return utilities_1.bufferReadNumber(buffer, _this.offset); };
        this.serialize = function (payload) {
            var buffer = Buffer.alloc(2 + _this.offset);
            utilities_1.bufferWriteNumber(buffer, payload, _this.offset);
            return buffer;
        };
    }
    return UInt16Parselizer;
}());
exports.UInt16Parselizer = UInt16Parselizer;
