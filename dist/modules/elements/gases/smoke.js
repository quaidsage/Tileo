import Gas from './gas.js';
import GasMove from '../../behaviours/GasMove.js';
import Life from '../../behaviours/Life.js';
import { randomColor } from '../../utils.js';
class Smoke extends Gas {
    constructor(index) {
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
    setColor(newColor) {
        this.color = newColor;
        Smoke.currentColor = newColor;
    }
    setProbability(newProbability) {
        this.probability = newProbability;
        Smoke.currentProbability = newProbability;
    }
    setMaxSpeed(newMaxSpeed) {
        const waterMove = this.behavioursLookup['GasMove'];
        waterMove.maxSpeed = newMaxSpeed;
        Smoke.currentMaxSpeed = newMaxSpeed;
    }
    setAcceleration(newAcceleration) {
        const waterMove = this.behavioursLookup['GasMove'];
        waterMove.acceleration = newAcceleration;
        Smoke.currentAcceleration = newAcceleration;
    }
    setLife(newLife) {
        const burningBehaviour = this.behavioursLookup['Life'];
        burningBehaviour.life = newLife;
        Smoke.currentLife = newLife;
    }
    setReduction(newReduction) {
        const burningBehaviour = this.behavioursLookup['Life'];
        burningBehaviour.reduction = newReduction;
        Smoke.currentReduction = newReduction;
    }
    setDispersion(newDispersion) {
        const waterMove = this.behavioursLookup['GasMove'];
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
Smoke.defaultColor = [48, 48, 48];
Smoke.defaultProbability = 0.3;
Smoke.defaultLife = 50;
Smoke.defaultReduction = 1;
Smoke.defaultMaxSpeed = 1;
Smoke.defaultAcceleration = 0.1;
Smoke.defaultDispersion = 2;
Smoke.currentColor = Smoke.defaultColor;
Smoke.currentProbability = Smoke.defaultProbability;
Smoke.currentLife = Smoke.defaultLife;
Smoke.currentReduction = Smoke.defaultReduction;
Smoke.currentMaxSpeed = Smoke.defaultMaxSpeed;
Smoke.currentAcceleration = Smoke.defaultAcceleration;
Smoke.currentDispersion = Smoke.defaultDispersion;
export default Smoke;
