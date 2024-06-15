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
import Behaviour from "./Behaviour.js";
import { DEBUG_LIFE } from "../config.js";
var Life = /** @class */ (function (_super) {
    __extends(Life, _super);
    function Life(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.life, life = _c === void 0 ? 50 : _c, _d = _b.reduction, reduction = _d === void 0 ? 1 : _d;
        var _e;
        var _this = _super.call(this) || this;
        var variation = 1000 / life;
        var min = life - variation;
        var max = life + variation;
        _this.life = (_e = Math.random() * (max - min) + min) !== null && _e !== void 0 ? _e : 100;
        _this.reduction = reduction !== null && reduction !== void 0 ? reduction : 1;
        return _this;
    }
    Life.prototype.onDeath = function (element, grid) {
        grid.removeIndex(element.index);
        grid.highlightIndex.add(element.index);
    };
    Life.prototype.update = function (grid, element) {
        if (DEBUG_LIFE) {
            element.debugColor = [150, this.life * 5, 0];
        }
        if (this.life <= 0) {
            this.onDeath(element, grid);
            return;
        }
        this.life = this.life - this.reduction;
        // Calculate the percentage of life remaining
        var lifePercentage = this.life / (this.life + this.reduction);
        // Fade out the color based on the percentage of life remaining
        element.color = element.color.map(function (colorComponent) { return colorComponent * lifePercentage; });
        if (element.onFire) {
            grid.highlightIndex.add(element.index);
        }
    };
    return Life;
}(Behaviour));
export default Life;
