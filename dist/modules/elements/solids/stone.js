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
import Solid from './solid.js';
import { randomColor } from '../../utils.js';
var Stone = /** @class */ (function (_super) {
    __extends(Stone, _super);
    function Stone(index) {
        var _this = _super.call(this, index) || this;
        _this.probability = Stone.currentProbability;
        _this.color = randomColor(Stone.currentColor);
        return _this;
    }
    Stone.prototype.setColor = function (newColor) {
        this.color = newColor;
        Stone.currentColor = newColor;
    };
    Stone.prototype.setProbability = function (newProbability) {
        this.probability = newProbability;
        Stone.currentProbability = newProbability;
    };
    Stone.prototype.toString = function () {
        return 's';
    };
    Stone.defaultColor = [100, 100, 100];
    Stone.defaultProbability = 1;
    Stone.currentColor = Stone.defaultColor;
    Stone.currentProbability = Stone.defaultProbability;
    return Stone;
}(Solid));
export default Stone;
