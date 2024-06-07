import Element from '../element.js';
import { randomColor } from '../../utils.js';
import Burning from '../../behaviours/Burning.js';
import WaterMove from '../../behaviours/WaterMove.js';

class Custom extends Element {
    static defaultColor = [180, 150, 255];
    static defaultProbability = 0.2;
    static defaultMaxSpeed = 1;
    static defaultAcceleration = 0.1;
    static defaultLife = 200;
    static defaultReduction = 2;
    static defaultChanceToSpread = 0.1;
    static defaultDispersion = 1;

    static currentColor = Custom.defaultColor;
    static currentProbability = Custom.defaultProbability;
    static currentMaxSpeed = Custom.defaultMaxSpeed;
    static currentAcceleration = Custom.defaultAcceleration;
    static currentLife = Custom.defaultLife;
    static currentReduction = Custom.defaultReduction;
    static currentChanceToSpread = Custom.defaultChanceToSpread;
    static currentDispersion = Custom.defaultDispersion;

    constructor(index) {
        super(index, {
            color: randomColor(Custom.currentColor),
            probability: Custom.currentProbability,
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
    }

    setMaxSpeed(newMaxSpeed) {
        this.behavioursLookup['SolidMove'].maxSpeed = newMaxSpeed;
        Custom.currentMaxSpeed = newMaxSpeed;
    }

    setAcceleration(newAcceleration) {
        this.behavioursLookup['SolidMove'].acceleration = newAcceleration;
        Custom.currentAcceleration = newAcceleration;
    }

    setLife(newLife) {
        this.behavioursLookup['Burning'].life = newLife;
        Custom.currentLife = newLife;
    }

    setReduction(newReduction) {
        this.behavioursLookup['Burning'].reduction = newReduction;
        Custom.currentReduction = newReduction;
    }

    setChanceToSpread(newChanceToSpread) {
        this.behavioursLookup['Burning'].chanceToSpread = newChanceToSpread;
        Custom.currentChanceToSpread = newChanceToSpread;
    }

    setDispersion(newDispersion) {
        this.behavioursLookup['WaterMove'].dispersion = newDispersion;
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

export default Custom;