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
var Liquid = /** @class */ (function (_super) {
    __extends(Liquid, _super);
    function Liquid(index, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.onFire, onFire = _c === void 0 ? false : _c, _d = _b.behaviours, behaviours = _d === void 0 ? [] : _d;
        var _this = _super.call(this, index, { onFire: onFire, behaviours: behaviours }) || this;
        _this.liquid = true;
        return _this;
    }
    return Liquid;
}(Element));
export default Liquid;
