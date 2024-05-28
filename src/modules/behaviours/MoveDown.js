import Behaviour from './Behaviour.js';
class MoveDown extends Behaviour {
    constructor({ maxSpeed, acceleration, velocity } = {}) {
        super();
        this.maxSpeed = maxSpeed ?? 0;
        this.acceleration = acceleration ?? 0;
        this.velocity = velocity ?? 0;
    }

    resetVelocity() {
        this.velocity = 0;
    }

    updateVelocity(element) {
        element.velocity += this.acceleration;
        element.velocity = Math.min(element.velocity, this.maxSpeed);
    }

    availableMoves(nx, ny, grid) {
        const moves = [0, 0, 0];
        if (grid.isValidIndex(nx, ny) && grid.isEmpty(ny * grid.col + nx)) {
            moves[0] = 1; // Move down
        }
        if (grid.isValidIndex(nx - 1, ny) && grid.isEmpty(ny * grid.col + nx - 1)) {
            moves[1] = 1; // Move down left
        }
        if (grid.isValidIndex(nx + 1, ny) && grid.isEmpty(ny * grid.col + nx + 1)) {
            moves[2] = 1; // Move down right
        }
        return moves;
    }

    update(element, grid) {
        this.updateVelocity(element);
        const x = element.index % grid.row;
        const y = Math.floor(element.index / grid.col);
        let nx = x;
        let ny = y + Math.ceil(element.velocity);
        let steps = 0;
        while (steps < Math.ceil(element.velocity)) {
            let moves = this.availableMoves(nx, ny, grid);
            if (moves[0] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx);
            } else if (moves[1] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx - 1);
            } else if (moves[2] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx + 1);
            }
            ny--;
            steps++;
        }
    }

}
export default MoveDown;