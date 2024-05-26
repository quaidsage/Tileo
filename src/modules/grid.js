import Empty from './elements/empty.js';
import {drawPixel, brushSize, sqrW, col, row, ctx} from './renderer.js';
import {mouseX, mouseY} from './controls.js';

class Grid {
    initialize(row,col) {
        this.row = row;
        this.col = col;
        this.grid = new Array(row*col).fill(new Empty());
    }

    reset() {
        this.grid = new Array(row*col).fill(new Empty());
    }

    setElement(x, y, element) {
        this.grid[y* this.col + x] = element;
    }

    setBrush(x, y, element) {
        for (let i = x - brushSize; i <= x + brushSize; i++) {
            for (let j = y - brushSize; j <= y + brushSize; j++) {
                let dx = i - x;
                let dy = j - y;
                if (dx * dx + dy * dy <= brushSize * brushSize) {
                    if (i >= 0 && i < col && j >= 0 && j < row) {
                        if (Math.random() < element.probability) {      
                            this.setElement(i, j, new element.constructor());
                        }
                    }
                }
            }
        }
    }

    swap(a, b) {
        if (this.grid[a].empty && this.grid[b].empty) {
            return;
          }
        let temp = this.grid[a];
        this.grid[a] = this.grid[b];
        this.grid[b] = temp;
    }

    isEmpty(i) {
        return this.grid[i].empty;
    }

    isLiquid(i) {
        return this.grid[i].liquid;
    }

    draw() {
        this.grid.forEach((element, index) => {
            drawPixel(index, element);
        })
        
        let x = Math.floor(mouseX / sqrW);
        let y = Math.floor(mouseY / sqrW);
        for (let i = x - brushSize; i <= x + brushSize; i++) {
            for (let j = y - brushSize; j <= y + brushSize; j++) {
                let dx = i - x;
                let dy = j - y;
                if (dx * dx + dy * dy <= brushSize * brushSize) {
                    if (i >= 0 && i < col && j >= 0 && j < row) {
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                        ctx.fillRect(i * sqrW, j * sqrW, sqrW, sqrW);
                    }
                }
            }
        }

        this.update();
    }

    update() {
        // for (let i = this.grid.length - this.row - 1; i > 0; i--) {
        //     if (this.grid[i].still || this.grid[i].empty) {
        //         continue;
        //     }
        //     this.grid[i].update(i);
        // }

        for (let i = Math.floor(this.grid.length / this.col) - 1; i >= 0; i--) {
            let rndmOffset = Math.random() > 0.5;
            for (let j = 0; j < this.col; j++) {
                
                let colOffset = rndmOffset ? j : -j + this.col - 1;
                this.grid[i*this.col + colOffset].update(i*this.col + colOffset);
            }  
        }
    }
}

export default Grid;
