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

    update(element, grid) {
        element.velocity += this.acceleration;
        element.velocity = Math.min(element.velocity, this.maxSpeed);
        const x = element.index % grid.row;
        const y = Math.floor(element.index / grid.col);
        let nx = x;
        let ny = y + element.velocity;
        let steps = 0;
        while (steps < element.velocity) {
            if (grid.isValidIndex(nx, ny)) {
                if (grid.isEmpty(ny * grid.col + nx)) {
                    grid.swap((y * grid.col + x), (ny * grid.col + nx));
                    //grid.swap(x, y, nx, ny - 1);
                    break;
                }
            }
            nx = x;
            ny -= 1;
            steps++;
        }
    }

}
export default MoveDown;