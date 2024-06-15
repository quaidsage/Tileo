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
var Empty = /** @class */ (function (_super) {
    __extends(Empty, _super);
    function Empty(index) {
        var _this = _super.call(this, index) || this;
        _this.color = Empty.currentColor;
        return _this;
    }
    Empty.prototype.setColor = function (newColor) {
        this.color = newColor;
        Empty.currentColor = newColor;
    };
    Empty.prototype.setProbability = function (newProbability) {
        this.probability = newProbability;
        Empty.currentProbability = newProbability;
    };
    Empty.prototype.resetDefaults = function () {
        return;
    };
    Empty.prototype.toString = function () {
        return '_';
    };
    Empty.defaultColor = [60, 100, 190];
    Empty.defaultProbability = 1;
    Empty.currentColor = Empty.defaultColor;
    Empty.currentProbability = Empty.defaultProbability;
    return Empty;
}(Element));
export default Empty;
