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
var Solid = /** @class */ (function (_super) {
    __extends(Solid, _super);
    function Solid(index, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.behaviours, behaviours = _c === void 0 ? [] : _c;
        return _super.call(this, index, { solid: true, behaviours: behaviours }) || this;
    }
    return Solid;
}(Element));
export default Solid;
