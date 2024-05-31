import Empty from './elements/empty.js';
import { drawPixel, gridWidth, col, row, ctx, grid } from './renderer.js';
import { currentElement, brushSize, mouseX, mouseY } from './controls.js';

class Grid {
    initialize(row, col) {
        this.row = row;
        this.col = col;
        this.grid = new Array(row * col).fill(new Empty());
    }

    reset() {
        this.grid = new Array(row * col).fill(new Empty());
    }

    setIndex(i, element) {
        element.index = i;
    }

    setElement(x, y, element) {
        this.grid[y * this.col + x] = element;
    }

    setBrush(x, y, element) {
        for (let i = x - brushSize; i <= x + brushSize; i++) {
            for (let j = y - brushSize; j <= y + brushSize; j++) {
                let dx = i - x;
                let dy = j - y;
                if (dx * dx + dy * dy <= brushSize * brushSize) {
                    if (i >= 0 && i < col && j >= 0 && j < row) {
                        if (Math.random() < element.probability) {
                            let newElement = new element.constructor(j * this.col + i);
                            this.setIndex(j * this.col + i, newElement);
                            this.setElement(i, j, newElement);
                        }
                    }
                }
            }
        }
    }

    swap(a, b) {
        let aOffset = 0;
        let bOffset = 0;
        if (this.grid[a].empty && this.grid[b].empty) {
            return;
        }
        let temp = this.grid[a];
        this.setIndex(a, this.grid[b]);
        this.setIndex(b, temp);
        this.grid[a] = this.grid[b];
        this.grid[b] = temp;
    }

    isEmpty(i) {
        return this.grid[i].empty;
    }

    isLiquid(i) {
        return this.grid[i].liquid;
    }

    isValidIndex(x, y) {
        return x >= 0 && x < this.col && y >= 0 && y < this.row;
    }

    draw() {
        this.grid.forEach((element, index) => {
            drawPixel(index, element);
        })

        let x = Math.floor(mouseX / gridWidth);
        let y = Math.floor(mouseY / gridWidth);
        for (let i = x - brushSize; i <= x + brushSize; i++) {
            for (let j = y - brushSize; j <= y + brushSize; j++) {
                let dx = i - x;
                let dy = j - y;
                if (dx * dx + dy * dy <= brushSize * brushSize) {
                    if (i >= 0 && i < col && j >= 0 && j < row) {
                        ctx.fillStyle = `rgba(${currentElement.color[0]}, ${currentElement.color[1]}, ${currentElement.color[2]}, 0.3)`;
                        ctx.fillRect(i * gridWidth, j * gridWidth, gridWidth, gridWidth);
                    }
                }
            }
        }

        this.update();
    }

    update() {
        for (let i = Math.floor(this.grid.length / this.col) - 1; i >= 0; i--) {
            let rndmOffset = Math.random() > 0.5;
            for (let j = 0; j < this.col; j++) {
                let colOffset = rndmOffset ? j : -j + this.col - 1;
                this.grid[i * this.col + colOffset].update(this);
            }
        }
    }
}

export default Grid;
