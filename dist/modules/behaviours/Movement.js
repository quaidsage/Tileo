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
import Behaviour from './Behaviour.js';
import { DEBUG_VELOCITY, DEBUG_MOVEMENT } from '../config.js';
var MoveDown = /** @class */ (function (_super) {
    __extends(MoveDown, _super);
    function MoveDown(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.maxSpeed, maxSpeed = _c === void 0 ? 0 : _c, _d = _b.acceleration, acceleration = _d === void 0 ? 0 : _d, _e = _b.velocity, velocity = _e === void 0 ? 0 : _e;
        var _this = _super.call(this) || this;
        _this.maxSpeed = maxSpeed !== null && maxSpeed !== void 0 ? maxSpeed : 0;
        _this.acceleration = acceleration !== null && acceleration !== void 0 ? acceleration : 0;
        _this.velocity = velocity !== null && velocity !== void 0 ? velocity : 0;
        _this.previousPosition = -1;
        return _this;
    }
    MoveDown.prototype.resetVelocity = function (element) {
        this.velocity = 0;
        if (DEBUG_VELOCITY || DEBUG_MOVEMENT) {
            element.debugColor = [0, 255, 0];
        }
    };
    MoveDown.prototype.updateVelocity = function (element) {
        this.velocity += this.acceleration;
        this.velocity >= 0 ? this.velocity = Math.min(this.velocity, this.maxSpeed) : this.velocity = Math.max(this.velocity, -this.maxSpeed);
        if (DEBUG_VELOCITY) {
            element.debugColor = [Math.abs(this.velocity) * 100, 100 - (Math.abs(this.velocity) * 10), 0];
            if (this.velocity == this.maxSpeed) {
                element.debugColor = [255, 0, 100];
            }
        }
    };
    MoveDown.prototype.availableMoves = function (nx, ny, grid) {
        var moves = [0, 0, 0];
        if (grid.isValidIndex(nx, ny) && grid.isEmpty(ny * grid.col + nx)) {
            moves[0] = 1;
        }
        if (grid.isValidIndex(nx - 1, ny) && grid.isEmpty(ny * grid.col + nx - 1)) {
            moves[1] = 1;
        }
        if (grid.isValidIndex(nx + 1, ny) && grid.isEmpty(ny * grid.col + nx + 1)) {
            moves[2] = 1;
        }
        return moves;
    };
    // Need to fix where solids with high velocity phase through solid elements
    MoveDown.prototype.step = function (element, grid, x, y, nx, ny) {
        while (ny > y) {
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
            ny--;
        }
    };
    MoveDown.prototype.update = function (grid, element) {
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
        var ny = y + Math.ceil(this.velocity) + 1;
        this.step(element, grid, x, y, nx, ny);
    };
    return MoveDown;
}(Behaviour));
export default MoveDown;
