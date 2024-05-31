import MoveDown from "./MoveDown.js";

class SolidMove extends MoveDown {
    availableMoves(nx, ny, grid) {
        const moves = super.availableMoves(nx, ny, grid);
        if (grid.isValidIndex(nx, ny) && (grid.isEmpty(ny * grid.col + nx) || grid.isLiquid(ny * grid.col + nx))) {
            moves[0] = 1; // Move down
        }
        if (grid.isValidIndex(nx - 1, ny) && (grid.isEmpty(ny * grid.col + nx - 1) || grid.isLiquid(ny * grid.col + nx - 1))) {
            moves[1] = 1; // Move down left
        }
        if (grid.isValidIndex(nx + 1, ny) && (grid.isEmpty(ny * grid.col + nx + 1) || grid.isLiquid(ny * grid.col + nx + 1))) {
            moves[2] = 1; // Move down right
        }
        return moves;
    }
}
export default SolidMove;