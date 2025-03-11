import Liquid from './liquid.js';
import WaterMove from '../../behaviours/WaterMove.js';
class Water extends Liquid {
    constructor(index) {
        super(index, {
            behaviours: [
                new WaterMove({
                    maxSpeed: Water.currentMaxSpeed,
                    acceleration: Water.currentAcceleration,
                    dispersion: Water.currentDispersion
                })
            ]
        });
        this.probability = Water.currentProbability,
            this.color = Water.currentColor;
    }
    setColor(newColor) {
        this.color = newColor;
        Water.currentColor = newColor;
    }
    setProbability(newProbability) {
        this.probability = newProbability;
        Water.currentProbability = newProbability;
    }
    setMaxSpeed(newMaxSpeed) {
        const waterMove = this.behavioursLookup['WaterMove'];
        waterMove.maxSpeed = newMaxSpeed;
        Water.currentMaxSpeed = newMaxSpeed;
    }
    setAcceleration(newAcceleration) {
        const waterMove = this.behavioursLookup['WaterMove'];
        waterMove.acceleration = newAcceleration;
        Water.currentAcceleration = newAcceleration;
    }
    setDispersion(newDispersion) {
        const waterMove = this.behavioursLookup['WaterMove'];
        waterMove.dispersion = newDispersion;
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
Water.defaultColor = [50, 86, 183];
Water.defaultProbability = 0.5;
Water.defaultMaxSpeed = 3;
Water.defaultAcceleration = 0.1;
Water.defaultDispersion = 7;
Water.currentColor = Water.defaultColor;
Water.currentProbability = Water.defaultProbability;
Water.currentMaxSpeed = Water.defaultMaxSpeed;
Water.currentAcceleration = Water.defaultAcceleration;
Water.currentDispersion = Water.defaultDispersion;
export default Water;
