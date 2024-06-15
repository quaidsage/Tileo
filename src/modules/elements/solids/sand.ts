import Solid from './solid.js';
import { randomColor } from '../../utils.js';
import SolidMove from '../../behaviours/SolidMove.js';
import Element from '../element.js';

class Sand extends Solid {
    static defaultColor = [160, 120, 0];
    static defaultProbability = 0.1;
    static defaultMaxSpeed = 3;
    static defaultAcceleration = 0.1;

    static currentColor = Sand.defaultColor;
    static currentProbability = Sand.defaultProbability;
    static currentMaxSpeed = Sand.defaultMaxSpeed;
    static currentAcceleration = Sand.defaultAcceleration;
    static behavioursLookup: any;

    constructor(index: number) {
        super(index, {
            behaviours: [
                new SolidMove({
                    maxSpeed: Sand.currentMaxSpeed,
                    acceleration: Sand.currentAcceleration,
                })
            ]
        });
        this.probability = Sand.currentProbability
        this.color = randomColor(Sand.currentColor)
    }

    setColor(newColor: number[]) {
        this.color = newColor;
        Sand.currentColor = newColor;
    }

    setProbability(newProbability: number): void {
        this.probability = newProbability;
        Sand.currentProbability = newProbability;
    }

    setMaxSpeed(newMaxSpeed: number) {
        const solidMove: SolidMove = <SolidMove>this.behavioursLookup['SolidMove'];
        solidMove.maxSpeed = newMaxSpeed;
        Sand.currentMaxSpeed = newMaxSpeed;
    }

    setAcceleration(newAcceleration: number) {
        const solidMove: SolidMove = <SolidMove>this.behavioursLookup['SolidMove'];
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
export default Sand;