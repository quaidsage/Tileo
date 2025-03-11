import Life from "./Life.js";
import Smoke from "../elements/gases/smoke.js";
import Fire from "../elements/misc/fire.js";
import { randomColor } from "../utils.js";
class Burning extends Life {
    constructor({ life = 50, reduction = 1, chanceToSpread = 0.5 } = {}) {
        super({ life, reduction });
        this.chanceToSpread = chanceToSpread;
    }
    onDeath(element, grid) {
        element.onFire = false;
        const index = element.index;
        const x = element.index % grid.row;
        const y = Math.floor(element.index / grid.col);
        element.onFire = false;
        super.onDeath(element, grid);
        if (Math.random() > 0.6) {
            let replacement = new Smoke(element.index);
            grid.setElement(x, y, replacement);
            grid.setIndex(index, replacement);
        }
    }
    checkValidNeighbours(element, grid) {
        const neighbours = [];
        const nx = element.index % grid.row;
        const ny = Math.floor(element.index / grid.col);
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0)
                    continue;
                const neighbourX = nx + dx;
                const neighbourY = ny + dy;
                if (grid.isValidIndex(neighbourX, neighbourY)) {
                    const neighbourIndex = neighbourY * grid.col + neighbourX;
                    const neighbour = grid.get(neighbourIndex);
                    if (neighbour && neighbour.getBehaviour(Burning) && !neighbour.onFire) {
                        neighbours.push(neighbourIndex);
                    }
                }
            }
        }
        return neighbours;
    }
    update(grid, element) {
        if (element.onFire) {
            super.update(grid, element);
            if (Math.random() < this.chanceToSpread) {
                let neighbours = this.checkValidNeighbours(element, grid);
                if (neighbours.length > 0) {
                    let randomIndex = neighbours[Math.floor(Math.random() * neighbours.length)];
                    let randomElement = grid.get(randomIndex);
                    randomElement.onFire = true;
                    randomElement.color = randomColor(Fire.currentColor);
                }
            }
        }
    }
}
export default Burning;
