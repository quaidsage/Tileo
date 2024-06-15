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
import SolidMove from "./SolidMove.js";
var GasMove = /** @class */ (function (_super) {
    __extends(GasMove, _super);
    function GasMove(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.maxSpeed, maxSpeed = _c === void 0 ? 0 : _c, _d = _b.acceleration, acceleration = _d === void 0 ? 0 : _d, _e = _b.velocity, velocity = _e === void 0 ? 0 : _e, _f = _b.dispersion, dispersion = _f === void 0 ? 0 : _f;
        var _this = _super.call(this, { maxSpeed: maxSpeed, acceleration: acceleration, velocity: velocity }) || this;
        _this.dispersion = dispersion !== null && dispersion !== void 0 ? dispersion : 0;
        return _this;
    }
    GasMove.prototype.disperse = function (element, grid) {
        var x = element.index % grid.row;
        var y = Math.floor(element.index / grid.col);
        var leftDistance = 0;
        var rightDistance = 0;
        while (leftDistance < this.dispersion) {
            if (grid.isValidIndex(x - leftDistance - 1, y) && grid.isEmpty(y * grid.col + x - leftDistance - 1)) {
                leftDistance++;
            }
            else {
                break;
            }
        }
        while (rightDistance < this.dispersion) {
            if (grid.isValidIndex(x + rightDistance + 1, y) && grid.isEmpty(y * grid.col + x + rightDistance + 1)) {
                rightDistance++;
            }
            else {
                break;
            }
        }
        if (leftDistance + rightDistance > 0) {
            if (DEBUG_MOVEMENT)
                element.debugColor = [255, 255, 0];
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
    GasMove.prototype.step = function (element, grid, x, y, nx, ny) {
        while (ny < y) {
            var moves = this.availableMoves(nx, ny, grid);
            if (moves[0] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx);
                if (DEBUG_MOVEMENT) {
                    element.debugColor = [255, 0, 0];
                }
                break;
            }
            else if (moves[1] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx - 1);
                if (DEBUG_MOVEMENT) {
                    element.debugColor = [0, 0, 255];
                }
                break;
            }
            else if (moves[2] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx + 1);
                if (DEBUG_MOVEMENT) {
                    element.debugColor = [0, 0, 255];
                }
                break;
            }
            ny++;
        }
    };
    GasMove.prototype.update = function (grid, element) {
        if (this.previousPosition === element.index) {
            this.resetVelocity(element);
        }
        else {
            this.updateVelocity(element);
        }
        this.previousPosition = element.index;
        var x = element.index % grid.row;
        var y = Math.floor(element.index / grid.col);
        var nx = x;
        var ny = y - Math.ceil(this.velocity) - 1;
        this.step(element, grid, x, y, nx, ny);
        this.disperse(element, grid);
    };
    return GasMove;
}(SolidMove));
export default GasMove;
