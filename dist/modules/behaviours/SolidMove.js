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
import Movement from "./Movement.js";
var SolidMove = /** @class */ (function (_super) {
    __extends(SolidMove, _super);
    function SolidMove() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SolidMove.prototype.availableMoves = function (nx, ny, grid) {
        var moves = _super.prototype.availableMoves.call(this, nx, ny, grid);
        if (grid.isValidIndex(nx, ny) && grid.isPassable(ny * grid.col + nx)) {
            moves[0] = 1; // Move down
        }
        if (grid.isValidIndex(nx - 1, ny) && grid.isPassable(ny * grid.col + nx - 1)) {
            moves[1] = 1; // Move down left
        }
        if (grid.isValidIndex(nx + 1, ny) && grid.isPassable(ny * grid.col + nx + 1)) {
            moves[2] = 1; // Move down right
        }
        return moves;
    };
    return SolidMove;
}(Movement));
export default SolidMove;
