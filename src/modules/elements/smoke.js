import Gas from './gas.js';
import GasMove from '../behaviours/GasMove.js';
import Life from '../behaviours/Life.js';
import { randomColor } from '../utils.js';

class Smoke extends Gas {
    constructor(index) {
        super(index, {
            color: randomColor([48, 48, 48]),
            gas: true,
            probability: 0.3,
            behaviours: [
                new GasMove({
                    maxSpeed: 1,
                    acceleration: 0.1,
                    dispersion: 1
                }),
                new Life({
                    life: 50,
                    reduction: 0.3
                })
            ]
        });
    }

    toString() {
        return 's';
    }
}
export default Smoke;