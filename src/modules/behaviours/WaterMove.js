import MoveDown from "./MoveDown.js";

class WaterMove extends MoveDown {
    constructor({ maxSpeed, acceleration, velocity, dispersion } = {}) {
        super({ maxSpeed, acceleration, velocity });
        this.dispersion = dispersion ?? 0;
    }
}
export default WaterMove;