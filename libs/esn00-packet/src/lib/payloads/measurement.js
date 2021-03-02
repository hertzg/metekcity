"use strict";
exports.__esModule = true;
exports.MeasurementParselizer = void 0;
var utilities_1 = require("../utilities");
var MeasurementParselizer = /** @class */ (function () {
    function MeasurementParselizer() {
        this.parse = function (buffer) { return ({
            value: utilities_1.bufferReadSignedNumber(buffer, 0),
            unit: buffer.readUInt8(3),
            settled: utilities_1.bufferReadBoolean(buffer, 4)
        }); };
        this.serialize = function (payload) {
            var buffer = Buffer.alloc(5);
            utilities_1.bufferWriteSignedNumber(buffer, payload.value, 0);
            buffer.writeUInt8(payload.unit, 3);
            utilities_1.bufferWriteBoolean(buffer, payload.settled, 4);
            return buffer;
        };
    }
    return MeasurementParselizer;
}());
exports.MeasurementParselizer = MeasurementParselizer;
