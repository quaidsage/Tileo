import Element from '../element.js';
import { randomColor } from '../../utils.js';
import Burning from '../../behaviours/Burning.js';
import WaterMove from '../../behaviours/WaterMove.js';
class Custom extends Element {
    constructor(index) {
        super(index, {
            solid: true,
            behaviours: [
                new WaterMove({
                    maxSpeed: Custom.currentMaxSpeed,
                    acceleration: Custom.currentAcceleration,
                    dispersion: Custom.currentDispersion
                }),
                new Burning({
                    life: Custom.currentLife,
                    reduction: Custom.currentReduction,
                    chanceToSpread: Custom.currentChanceToSpread,
                })
            ]
        });
        this.probability = Custom.currentProbability;
        this.color = randomColor(Custom.currentColor);
    }
    setColor(newColor) {
        this.color = newColor;
        Custom.currentColor = newColor;
    }
    setProbability(newProbability) {
        this.probability = newProbability;
        Custom.currentProbability = newProbability;
    }
    setMaxSpeed(newMaxSpeed) {
        const waterMove = this.behavioursLookup['WaterMove'];
        waterMove.maxSpeed = newMaxSpeed;
        Custom.currentMaxSpeed = newMaxSpeed;
    }
    setAcceleration(newAcceleration) {
        const waterMove = this.behavioursLookup['WaterMove'];
        waterMove.acceleration = newAcceleration;
        Custom.currentAcceleration = newAcceleration;
    }
    setLife(newLife) {
        const burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.life = newLife;
        Custom.currentLife = newLife;
    }
    setReduction(newReduction) {
        const burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.reduction = newReduction;
        Custom.currentReduction = newReduction;
    }
    setChanceToSpread(newChanceToSpread) {
        const burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.chanceToSpread = newChanceToSpread;
        Custom.currentChanceToSpread = newChanceToSpread;
    }
    setDispersion(newDispersion) {
        const waterMove = this.behavioursLookup['WaterMove'];
        waterMove.dispersion = newDispersion;
        Custom.currentDispersion = newDispersion;
    }
    resetDefaults() {
        super.resetDefaults();
        this.setMaxSpeed(Custom.defaultMaxSpeed);
        this.setAcceleration(Custom.defaultAcceleration);
        this.setLife(Custom.defaultLife);
        this.setReduction(Custom.defaultReduction);
        this.setChanceToSpread(Custom.defaultChanceToSpread);
        this.setDispersion(Custom.defaultDispersion);
    }
    toString() {
        return 'C';
    }
}
Custom.defaultColor = [180, 150, 255];
Custom.defaultProbability = 0.2;
Custom.defaultMaxSpeed = 1;
Custom.defaultAcceleration = 0.1;
Custom.defaultLife = 200;
Custom.defaultReduction = 2;
Custom.defaultChanceToSpread = 0.1;
Custom.defaultDispersion = 1;
Custom.currentColor = Custom.defaultColor;
Custom.currentProbability = Custom.defaultProbability;
Custom.currentMaxSpeed = Custom.defaultMaxSpeed;
Custom.currentAcceleration = Custom.defaultAcceleration;
Custom.currentLife = Custom.defaultLife;
Custom.currentReduction = Custom.defaultReduction;
Custom.currentChanceToSpread = Custom.defaultChanceToSpread;
Custom.currentDispersion = Custom.defaultDispersion;
export default Custom;
