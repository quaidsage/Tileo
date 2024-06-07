import Movement from "./Movement.js";

class SolidMove extends Movement {
    availableMoves(nx, ny, grid) {
        const moves = super.availableMoves(nx, ny, grid);
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
    }
}
export default SolidMove;