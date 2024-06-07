import Liquid from './liquid.js';
import WaterMove from '../../behaviours/WaterMove.js';
import { randomColor } from '../../utils.js';

class Water extends Liquid {
    static defaultColor = [50, 86, 183];
    static defaultProbability = 0.5;
    static defaultMaxSpeed = 3;
    static defaultAcceleration = 0.1;
    static defaultDispersion = 7;

    static currentColor = Water.defaultColor;
    static currentProbability = Water.defaultProbability;
    static currentMaxSpeed = Water.defaultMaxSpeed;
    static currentAcceleration = Water.defaultAcceleration;
    static currentDispersion = Water.defaultDispersion;

    constructor(index) {
        super(index, {
            color: Water.currentColor,
            liquid: true,
            probability: Water.currentProbability,
            behaviours: [
                new WaterMove({
                    maxSpeed: Water.currentMaxSpeed,
                    acceleration: Water.currentAcceleration,
                    dispersion: Water.currentDispersion
                })
            ]
        });
    }

    setMaxSpeed(newMaxSpeed) {
        this.behavioursLookup['WaterMove'].maxSpeed = newMaxSpeed;
        Water.currentMaxSpeed = newMaxSpeed;
    }

    setAcceleration(newAcceleration) {
        this.behavioursLookup['WaterMove'].acceleration = newAcceleration;
        Water.currentAcceleration = newAcceleration;
    }

    setDispersion(newDispersion) {
        this.behavioursLookup['WaterMove'].dispersion = newDispersion;
        Water.currentDispersion = newDispersion;
    }

    resetDefaults() {
        super.resetDefaults();
        this.setMaxSpeed(Water.defaultMaxSpeed);
        this.setAcceleration(Water.defaultAcceleration);
        this.setDispersion(Water.defaultDispersion);
    }

    toString() {
        return 'W';
    }
}
export default Water;
