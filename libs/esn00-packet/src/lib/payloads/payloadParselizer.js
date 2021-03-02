"use strict";
exports.__esModule = true;
var genericBoolean_1 = require("./genericBoolean");
var genericUInt8_1 = require("./genericUInt8");
var genericUInt16_1 = require("./genericUInt16");
var measurement_1 = require("./measurement");
var PayloadParselizer = /** @class */ (function () {
    function PayloadParselizer(_invertedBooleanParselizer, _booleanParselizer, _uint8Parselizer, _uint16Parselizer, _measurementParselizer) {
        var _this = this;
        if (_invertedBooleanParselizer === void 0) { _invertedBooleanParselizer = new genericBoolean_1.BooleanParselizer(true); }
        if (_booleanParselizer === void 0) { _booleanParselizer = new genericBoolean_1.BooleanParselizer(); }
        if (_uint8Parselizer === void 0) { _uint8Parselizer = new genericUInt8_1.UInt8Parselizer(); }
        if (_uint16Parselizer === void 0) { _uint16Parselizer = new genericUInt16_1.UInt16Parselizer(); }
        if (_measurementParselizer === void 0) { _measurementParselizer = new measurement_1.MeasurementParselizer(); }
        this._invertedBooleanParselizer = _invertedBooleanParselizer;
        this._booleanParselizer = _booleanParselizer;
        this._uint8Parselizer = _uint8Parselizer;
        this._uint16Parselizer = _uint16Parselizer;
        this._measurementParselizer = _measurementParselizer;
        this._getCodec = function (type) {
            switch (type) {
                case 213 /* AUTO_OFF_STATE */:
                    return _this._uint16Parselizer;
                case 192 /* SET_UNIT */:
                case 196 /* SET_AUTO_OFF */:
                case 209 /* UNIT_STATE */:
                    return _this._uint8Parselizer;
                case 228 /* ITEM_STATE */:
                case 211 /* TARE_STATE */:
                case 224 /* ERROR_STATE */:
                    return _this._invertedBooleanParselizer;
                case 193 /* SET_TARE */:
                    return _this._booleanParselizer;
                case 208 /* MEASUREMENT */:
                    return _this._measurementParselizer;
                default:
                    return null;
            }
        };
        this.parse = function (type, payload) {
            var parselizer = _this._getCodec(type);
            if (!parselizer) {
                return null;
            }
            return parselizer.parse(payload);
        };
        this.serialize = function (type, payload) {
            var parselizer = _this._getCodec(type);
            if (!parselizer) {
                return null;
            }
            return parselizer.serialize(payload);
        };
    }
    return PayloadParselizer;
}());
exports["default"] = PayloadParselizer;
