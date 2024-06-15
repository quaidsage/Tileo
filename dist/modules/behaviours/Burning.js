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
import Life from "./Life.js";
import Smoke from "../elements/gases/smoke.js";
import Fire from "../elements/misc/fire.js";
import { randomColor } from "../utils.js";
var Burning = /** @class */ (function (_super) {
    __extends(Burning, _super);
    function Burning(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.life, life = _c === void 0 ? 50 : _c, _d = _b.reduction, reduction = _d === void 0 ? 1 : _d, _e = _b.chanceToSpread, chanceToSpread = _e === void 0 ? 0.5 : _e;
        var _this = _super.call(this, { life: life, reduction: reduction }) || this;
        _this.chanceToSpread = chanceToSpread;
        return _this;
    }
    Burning.prototype.onDeath = function (element, grid) {
        element.onFire = false;
        var index = element.index;
        var x = element.index % grid.row;
        var y = Math.floor(element.index / grid.col);
        element.onFire = false;
        _super.prototype.onDeath.call(this, element, grid);
        if (Math.random() > 0.6) {
            var replacement = new Smoke(element.index);
            grid.setElement(x, y, replacement);
            grid.setIndex(index, replacement);
        }
    };
    Burning.prototype.checkValidNeighbours = function (element, grid) {
        var neighbours = [];
        var nx = element.index % grid.row;
        var ny = Math.floor(element.index / grid.col);
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0)
                    continue;
                var neighbourX = nx + dx;
                var neighbourY = ny + dy;
                if (grid.isValidIndex(neighbourX, neighbourY)) {
                    var neighbourIndex = neighbourY * grid.col + neighbourX;
                    var neighbour = grid.get(neighbourIndex);
                    if (neighbour && neighbour.getBehaviour(Burning) && !neighbour.onFire) {
                        neighbours.push(neighbourIndex);
                    }
                }
            }
        }
        return neighbours;
    };
    Burning.prototype.update = function (grid, element) {
        if (element.onFire) {
            _super.prototype.update.call(this, grid, element);
            if (Math.random() < this.chanceToSpread) {
                var neighbours = this.checkValidNeighbours(element, grid);
                if (neighbours.length > 0) {
                    var randomIndex = neighbours[Math.floor(Math.random() * neighbours.length)];
                    var randomElement = grid.get(randomIndex);
                    randomElement.onFire = true;
                    randomElement.color = randomColor(Fire.currentColor);
                }
            }
        }
    };
    return Burning;
}(Life));
export default Burning;
