import Solid from './solid.js';
import { randomColor } from '../../utils.js';

class Stone extends Solid {
    static defaultColor = [100, 100, 100];
    static defaultProbability = 1;

    static currentColor = Stone.defaultColor;
    static currentProbability = Stone.defaultProbability;

    constructor(index: number) {
        super(index);
        this.probability = Stone.currentProbability;
        this.color = randomColor(Stone.currentColor)
    }

    setColor(newColor: number[]) {
        this.color = newColor;
        Stone.currentColor = newColor;
    }

    setProbability(newProbability: number): void {
        this.probability = newProbability;
        Stone.currentProbability = newProbability;
    }

    toString() {
        return 's';
    }
}
export default Stone;