import MoveDown from "./MoveDown.js";

class WaterMove extends MoveDown {
    constructor({ maxSpeed, acceleration, velocity, dispersion } = {}) {
        super({ maxSpeed, acceleration, velocity });
        this.dispersion = dispersion ?? 0;
    }

    availableMoves(nx, ny, grid) {
        const moves = [0, 0, 0];
        if (grid.isValidIndex(nx, ny) && (grid.isEmpty(ny * grid.col + nx) || grid.isGas(ny * grid.col + nx))) {
            moves[0] = 1; // Move down
        }
        if (grid.isValidIndex(nx - 1, ny) && (grid.isEmpty(ny * grid.col + nx - 1) || grid.isGas(ny * grid.col + nx - 1))) {
            moves[1] = 1; // Move down left
        }
        if (grid.isValidIndex(nx + 1, ny) && (grid.isEmpty(ny * grid.col + nx + 1) || grid.isGas(ny * grid.col + nx + 1))) {
            moves[2] = 1; // Move down right
        }
        return moves;
    }
}
export default WaterMove;