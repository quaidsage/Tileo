import Solid from './solid.js';
import { randomColor } from '../../utils.js';
import SolidMove from '../../behaviours/SolidMove.js';
class Sand extends Solid {
    constructor(index) {
        super(index, {
            behaviours: [
                new SolidMove({
                    maxSpeed: Sand.currentMaxSpeed,
                    acceleration: Sand.currentAcceleration,
                })
            ]
        });
        this.probability = Sand.currentProbability;
        this.color = randomColor(Sand.currentColor);
    }
    setColor(newColor) {
        this.color = newColor;
        Sand.currentColor = newColor;
    }
    setProbability(newProbability) {
        this.probability = newProbability;
        Sand.currentProbability = newProbability;
    }
    setMaxSpeed(newMaxSpeed) {
        const solidMove = this.behavioursLookup['SolidMove'];
        solidMove.maxSpeed = newMaxSpeed;
        Sand.currentMaxSpeed = newMaxSpeed;
    }
    setAcceleration(newAcceleration) {
        const solidMove = this.behavioursLookup['SolidMove'];
        solidMove.acceleration = newAcceleration;
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
Sand.defaultColor = [160, 120, 0];
Sand.defaultProbability = 0.1;
Sand.defaultMaxSpeed = 3;
Sand.defaultAcceleration = 0.1;
Sand.currentColor = Sand.defaultColor;
Sand.currentProbability = Sand.defaultProbability;
Sand.currentMaxSpeed = Sand.defaultMaxSpeed;
Sand.currentAcceleration = Sand.defaultAcceleration;
export default Sand;
