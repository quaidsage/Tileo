import Solid from './solid.js';
import { randomColor } from '../../utils.js';
import SolidMove from '../../behaviours/SolidMove.js';

class Sand extends Solid {
    static defaultColor = [160, 120, 0];
    static defaultProbability = 0.1;
    static defaultMaxSpeed = 3;
    static defaultAcceleration = 0.1;

    static currentColor = Sand.defaultColor;
    static currentProbability = Sand.defaultProbability;
    static currentMaxSpeed = Sand.defaultMaxSpeed;
    static currentAcceleration = Sand.defaultAcceleration;

    constructor(index) {
        super(index, {
            color: randomColor(Sand.currentColor),
            probability: Sand.currentProbability,
            behaviours: [
                new SolidMove({
                    maxSpeed: Sand.currentMaxSpeed,
                    acceleration: Sand.currentAcceleration,
                })
            ]
        });
    }

    setMaxSpeed(newMaxSpeed) {
        this.behavioursLookup['SolidMove'].maxSpeed = newMaxSpeed;
        Sand.currentMaxSpeed = newMaxSpeed;
    }

    setAcceleration(newAcceleration) {
        this.behavioursLookup['SolidMove'].acceleration = newAcceleration;
        Sand.currentAcceleration = newAcceleration;
    }

    resetDefaults() {
        super.resetDefaults();
        this.setMaxSpeed(Sand.defaultMaxSpeed);
        this.setAcceleration(Sand.defaultAcceleration);
    }

    toString() {
        return 'S';
    }
}
export default Sand;