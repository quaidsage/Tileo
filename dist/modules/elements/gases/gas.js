var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Element from '../element.js';
var Gas = /** @class */ (function (_super) {
    __extends(Gas, _super);
    function Gas(index, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.behaviours, behaviours = _c === void 0 ? [] : _c;
        var _this = _super.call(this, index, { behaviours: behaviours }) || this;
        _this.gas = true;
        return _this;
    }
    return Gas;
}(Element));
export default Gas;
