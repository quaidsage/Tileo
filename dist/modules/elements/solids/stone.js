import Solid from './solid.js';
import { randomColor } from '../../utils.js';
class Stone extends Solid {
    constructor(index) {
        super(index);
        this.probability = Stone.currentProbability;
        this.color = randomColor(Stone.currentColor);
    }
    setColor(newColor) {
        this.color = newColor;
        Stone.currentColor = newColor;
    }
    setProbability(newProbability) {
        this.probability = newProbability;
        Stone.currentProbability = newProbability;
    }
    toString() {
        return 's';
    }
}
Stone.defaultColor = [100, 100, 100];
Stone.defaultProbability = 1;
Stone.currentColor = Stone.defaultColor;
Stone.currentProbability = Stone.defaultProbability;
export default Stone;
