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

    constructor(index: number) {
        super(index, {
            liquid: true,
            behaviours: [
                new WaterMove({
                    maxSpeed: Custom.currentMaxSpeed,
                    acceleration: Custom.currentAcceleration,
                    dispersion: Custom.currentDispersion
                }),

            ]
        });
        this.probability = Custom.currentProbability;
        this.color = randomColor(Custom.currentColor);
    }

    setColor(newColor: number[]) {
        this.color = newColor;
        Custom.currentColor = newColor;
    }

    setProbability(newProbability: number): void {
        this.probability = newProbability;
        Custom.currentProbability = newProbability;
    }

    setMaxSpeed(newMaxSpeed: number) {
        const waterMove: WaterMove = <WaterMove>this.behavioursLookup['WaterMove'];
        waterMove.maxSpeed = newMaxSpeed;
        Custom.currentMaxSpeed = newMaxSpeed;
    }

    setAcceleration(newAcceleration: number) {
        const waterMove: WaterMove = <WaterMove>this.behavioursLookup['WaterMove'];
        waterMove.acceleration = newAcceleration;
        Custom.currentAcceleration = newAcceleration;
    }

    setLife(newLife: number) {
        const burningBehaviour: Burning = <Burning>this.behavioursLookup['Burning'];
        burningBehaviour.life = newLife;
        Custom.currentLife = newLife;
    }

    setReduction(newReduction: number) {
        const burningBehaviour: Burning = <Burning>this.behavioursLookup['Burning'];
        burningBehaviour.reduction = newReduction;
        Custom.currentReduction = newReduction;
    }

    setChanceToSpread(newChanceToSpread: number) {
        const burningBehaviour: Burning = <Burning>this.behavioursLookup['Burning'];
        burningBehaviour.chanceToSpread = newChanceToSpread;
        Custom.currentChanceToSpread = newChanceToSpread;
    }

    setDispersion(newDispersion: number) {
        const waterMove: WaterMove = <WaterMove>this.behavioursLookup['WaterMove'];
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

export default Custom;