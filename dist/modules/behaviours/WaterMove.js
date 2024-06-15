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
import { DEBUG_MOVEMENT } from "../config.js";
import Movement from "./Movement.js";
var WaterMove = /** @class */ (function (_super) {
    __extends(WaterMove, _super);
    function WaterMove(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.maxSpeed, maxSpeed = _c === void 0 ? 0 : _c, _d = _b.acceleration, acceleration = _d === void 0 ? 0 : _d, _e = _b.velocity, velocity = _e === void 0 ? 0 : _e, _f = _b.dispersion, dispersion = _f === void 0 ? 0 : _f;
        var _this = _super.call(this, { maxSpeed: maxSpeed, acceleration: acceleration, velocity: velocity }) || this;
        _this.dispersion = dispersion;
        return _this;
    }
    WaterMove.prototype.disperse = function (element, grid) {
        var x = element.index % grid.row;
        var y = Math.floor(element.index / grid.col);
        var leftDistance = 0;
        var rightDistance = 0;
        while (leftDistance < this.dispersion) {
            if (grid.isValidIndex(x - leftDistance - 1, y) && grid.isPassable(y * grid.col + x - leftDistance - 1)) {
                leftDistance++;
            }
            else {
                break;
            }
        }
        while (rightDistance < this.dispersion) {
            if (grid.isValidIndex(x + rightDistance + 1, y) && grid.isPassable(y * grid.col + x + rightDistance + 1)) {
                rightDistance++;
            }
            else {
                break;
            }
        }
        if (leftDistance + rightDistance > 0) {
            if (DEBUG_MOVEMENT && leftDistance > rightDistance)
                element.debugColor = [255, 0, 255];
            if (DEBUG_MOVEMENT && leftDistance < rightDistance)
                element.debugColor = [255, 255, 0];
            if (DEBUG_MOVEMENT && leftDistance == rightDistance)
                element.debugColor = [255, 255, 255];
            if (leftDistance > rightDistance) {
                grid.swap(y * grid.col + x, y * grid.col + x - leftDistance);
            }
            if (leftDistance < rightDistance) {
                grid.swap(y * grid.col + x, y * grid.col + x + rightDistance);
            }
            else {
                if (Math.random() > 0.5) {
                    grid.swap(y * grid.col + x, y * grid.col + x - leftDistance);
                }
                else {
                    grid.swap(y * grid.col + x, y * grid.col + x + rightDistance);
                }
            }
        }
    };
    WaterMove.prototype.update = function (grid, element) {
        _super.prototype.update.call(this, grid, element);
        if (element.index == this.previousPosition) {
            this.disperse(element, grid);
        }
    };
    return WaterMove;
}(Movement));
export default WaterMove;
