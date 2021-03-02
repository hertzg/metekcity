"use strict";
exports.__esModule = true;
exports.BooleanParselizer = void 0;
var utilities_1 = require("../utilities");
var BooleanParselizer = /** @class */ (function () {
    function BooleanParselizer(invert, offset) {
        var _this = this;
        if (invert === void 0) { invert = false; }
        if (offset === void 0) { offset = 0; }
        this.invert = invert;
        this.offset = offset;
        this.parse = function (buffer) {
            var value = utilities_1.bufferReadBoolean(buffer);
            return _this.invert ? !value : value;
        };
        this.serialize = function (payload) {
            var buffer = Buffer.alloc(1);
            var value = _this.invert ? !payload : payload;
            utilities_1.bufferWriteBoolean(buffer, value, _this.offset);
            return buffer;
        };
    }
    return BooleanParselizer;
}());
exports.BooleanParselizer = BooleanParselizer;
