import Gas from './gas.js';
import GasMove from '../../behaviours/GasMove.js';
import Life from '../../behaviours/Life.js';
import { randomColor } from '../../utils.js';

class Smoke extends Gas {
    static defaultColor = [48, 48, 48];
    static defaultProbability = 0.3;
    static defaultLife = 50;
    static defaultReduction = 0.3;
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

    constructor(index) {
        super(index, {
            color: randomColor(Smoke.currentColor),
            gas: true,
            probability: 0.3,
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
    }

    setLife(newLife) {
        this.behavioursLookup['Burning'].life = newLife;
        Smoke.currentLife = newLife;
    }

    setReduction(newReduction) {
        this.behavioursLookup['Burning'].reduction = newReduction;
        Smoke.currentReduction = newReduction;
    }

    setMaxSpeed(newMaxSpeed) {
        this.behavioursLookup['GasMove'].maxSpeed = newMaxSpeed;
        Smoke.currentMaxSpeed = newMaxSpeed;
    }

    setAcceleration(newAcceleration) {
        this.behavioursLookup['GasMove'].acceleration = newAcceleration;
        Smoke.currentAcceleration = newAcceleration;
    }

    setDispersion(newDispersion) {
        this.behavioursLookup['GasMove'].dispersion = newDispersion;
        Smoke.currentDispersion = newDispersion;
    }

    resetDefaults() {
        super.resetDefaults();
        this.setLife(defaultLife);
        this.setReduction(defaultReduction);
        this.setMaxSpeed(defaultMaxSpeed);
        this.setAcceleration(defaultAcceleration);
        this.setDispersion(defaultDispersion);
    }

    toString() {
        return 's';
    }
}
export default Smoke;