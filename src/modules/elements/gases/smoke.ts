import Gas from './gas.js';
import GasMove from '../../behaviours/GasMove.js';
import Life from '../../behaviours/Life.js';
import { randomColor } from '../../utils.js';

class Smoke extends Gas {
    static defaultColor = [48, 48, 48];
    static defaultProbability = 0.3;
    static defaultLife = 50;
    static defaultReduction = 1;
    static defaultMaxSpeed = 1;
    static defaultAcceleration = 0.1;
    static defaultDispersion = 2;

    static currentColor = Smoke.defaultColor;
    static currentProbability = Smoke.defaultProbability;
    static currentLife = Smoke.defaultLife;
    static currentReduction = Smoke.defaultReduction;
    static currentMaxSpeed = Smoke.defaultMaxSpeed;
    static currentAcceleration = Smoke.defaultAcceleration;
    static currentDispersion = Smoke.defaultDispersion;

    constructor(index: number) {
        super(index, {
            behaviours: [
                new GasMove({
                    maxSpeed: Smoke.currentMaxSpeed,
                    acceleration: Smoke.currentAcceleration,
                    dispersion: Smoke.currentDispersion
                }),
                new Life({
                    life: Smoke.currentLife,
                    reduction: Smoke.currentReduction
                })
            ]
        });
        this.probability = Smoke.currentProbability;
        this.color = randomColor(Smoke.currentColor);
    }

    setColor(newColor: number[]) {
        this.color = newColor;
        Smoke.currentColor = newColor;
    }

    setProbability(newProbability: number): void {
        this.probability = newProbability;
        Smoke.currentProbability = newProbability;
    }

    setMaxSpeed(newMaxSpeed: number) {
        const waterMove: GasMove = <GasMove>this.behavioursLookup['GasMove'];
        waterMove.maxSpeed = newMaxSpeed;
        Smoke.currentMaxSpeed = newMaxSpeed;
    }

    setAcceleration(newAcceleration: number) {
        const waterMove: GasMove = <GasMove>this.behavioursLookup['GasMove'];
        waterMove.acceleration = newAcceleration;
        Smoke.currentAcceleration = newAcceleration;
    }

    setLife(newLife: number) {
        const burningBehaviour: Life = <Life>this.behavioursLookup['Life'];
        burningBehaviour.life = newLife;
        Smoke.currentLife = newLife;
    }

    setReduction(newReduction: number) {
        const burningBehaviour: Life = <Life>this.behavioursLookup['Life'];
        burningBehaviour.reduction = newReduction;
        Smoke.currentReduction = newReduction;
    }

    setDispersion(newDispersion: number) {
        const waterMove: GasMove = <GasMove>this.behavioursLookup['GasMove'];
        waterMove.dispersion = newDispersion;
        Smoke.currentDispersion = newDispersion;
    }

    resetDefaults() {
        super.resetDefaults();
        this.setLife(Smoke.defaultLife);
        this.setReduction(Smoke.defaultReduction);
        this.setMaxSpeed(Smoke.defaultMaxSpeed);
        this.setAcceleration(Smoke.defaultAcceleration);
        this.setDispersion(Smoke.defaultDispersion);
    }

    toString() {
        return 's';
    }
}
export default Smoke;