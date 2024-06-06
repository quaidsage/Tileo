import Element from '../element.js';
import { randomColor } from '../../utils.js';
import SolidMove from '../../behaviours/SolidMove.js';

class Custom extends Element {
    static defaultColor = [180, 150, 255];
    static defaultProbability = 0.2;
    static defaultMaxSpeed = 1;
    static defaultAcceleration = 0.1;

    static currentColor = Custom.defaultColor;
    static currentProbability = Custom.defaultProbability;
    static currentMaxSpeed = Custom.defaultMaxSpeed;
    static currentAcceleration = Custom.defaultAcceleration;

    constructor(index) {
        super(index, {
            color: randomColor(Custom.currentColor),
            probability: Custom.currentProbability,
            solid: true,
            behaviours: [
                new SolidMove({
                    maxSpeed: Custom.currentMaxSpeed,
                    acceleration: Custom.currentAcceleration,
                })
            ]
        });
    }

    setMaxSpeed(newMaxSpeed) {
        this.behavioursLookup['SolidMove'].maxSpeed = newMaxSpeed;
        Custom.currentMaxSpeed = newMaxSpeed;
    }

    setAcceleration(newAcceleration) {
        this.behavioursLookup['SolidMove'].acceleration = newAcceleration;
        Custom.currentAcceleration = newAcceleration;
    }

    resetDefaults() {
        super.resetDefaults();
        this.setMaxSpeed(Custom.defaultMaxSpeed);
        this.setAcceleration(Custom.defaultAcceleration);
    }

    toString() {
        return 'C';
    }
}

export default Custom;