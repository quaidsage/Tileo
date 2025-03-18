import { drawPixel, gridWidth, ctx, updateOnNextFrame } from './renderer.js';
import { currentElement, mouseX, mouseY, isInspecting } from './controls.js';
import { ALLOW_REPLACEMENT, DEBUG_MODE, isPaused } from './config.js';
import { Sand, Water, Fire, Smoke, Wood, Stone, Custom, Empty } from './elements/ElementIndex.js';
import { getBrushSize } from './ui/brush-menu.js';
class Grid {
    initialize(row, col) {
        this.row = row;
        this.col = col;
        this.grid = new Array(row * col);
        for (let i = 0; i < row * col; i++) {
            this.grid[i] = new Empty(i);
        }
        this.drawAll();
        this.highlightIndex = new Set();
        this.debugView = false;
    }
    reset() {
        this.grid = new Array(this.row * this.col);
        for (let i = 0; i < this.row * this.col; i++) {
            this.grid[i] = new Empty(i);
        }
        this.drawAll();
    }
    fill() {
        for (let i = 0; i < this.row * this.col; i++) {
            let newElement = currentElement.constructor(i);
            this.setIndex(i, newElement);
            this.grid[i] = newElement;
        }
        this.drawAll();
    }
    updateColor() {
        this.grid.forEach((element, index) => {
            if (element.constructor.name === "Empty") {
                element.setColor(Empty.currentColor);
                updateOnNextFrame.add(index);
            }
        });
    }
    removeIndex(i) {
        this.grid[i] = new Empty(i);
    }
    get(i) {
        return this.grid[i];
    }
    getElement(i, j) {
        return this.grid[j * this.col + i];
    }
    setIndex(i, element) {
        element.index = i;
    }
    setElement(x, y, element) {
        let newElement;
        const index = y * this.col + x;
        switch (element.constructor.name) {
            case "Empty":
                newElement = new Empty(index);
                break;
            case "Sand":
                newElement = new Sand(index);
                break;
            case "Water":
                newElement = new Water(index);
                break;
            case "Wood":
                newElement = new Wood(index);
                break;
            case "Fire":
                newElement = new Fire(index);
                break;
            case "Smoke":
                newElement = new Smoke(index);
                break;
            case "Stone":
                newElement = new Stone(index);
                break;
            case "Custom":
                newElement = new Custom(index);
                break;
            default:
                newElement = new Empty(index);
        }
        this.grid[index] = newElement;
        updateOnNextFrame.add(index);
    }
    setBrush(x, y) {
        const elementConstructor = Object.getPrototypeOf(currentElement).constructor;
        let brushSize = getBrushSize();
        for (let i = x - brushSize; i <= x + brushSize; i++) {
            for (let j = y - brushSize; j <= y + brushSize; j++) {
                let dx = i - x;
                let dy = j - y;
                if (dx * dx + dy * dy <= brushSize * brushSize) {
                    if (this.isValidIndex(i, j)) {
                        const index = j * this.col + i;
                        if (currentElement.constructor.name === "Empty") {
                            this.removeIndex(index);
                        }
                        if (Math.random() < elementConstructor.currentProbability) {
                            if (ALLOW_REPLACEMENT || (this.get(index).constructor.name !== currentElement.constructor.name && this.isEmpty(index))) {
                                let newElement = currentElement instanceof Empty ? new Empty(index) : new elementConstructor(index);
                                this.setIndex(index, newElement);
                                this.setElement(i, j, newElement);
                            }
                        }
                    }
                }
            }
        }
    }
    swap(a, b) {
        if (this.grid[a] instanceof Empty && this.grid[b] instanceof Empty) {
            return;
        }
        let temp = this.grid[a];
        this.setIndex(a, this.grid[b]);
        this.setIndex(b, temp);
        this.grid[a] = this.grid[b];
        this.grid[b] = temp;
        updateOnNextFrame.add(a);
        updateOnNextFrame.add(b);
        drawPixel(a, this.grid[a]);
        drawPixel(b, this.grid[b]);
    }
    isEmpty(i) {
        return this.grid[i] instanceof Empty;
    }
    isLiquid(i) {
        return this.grid[i].liquid;
    }
    isGas(i) {
        return this.grid[i].gas;
    }
    isPassable(i) {
        return this.grid[i] instanceof Empty || this.grid[i].liquid || this.grid[i].gas;
    }
    isValidIndex(x, y) {
        return x >= 0 && x < this.col && y >= 0 && y < this.row;
    }
    draw() {
        if (this.currentDebugView !== DEBUG_MODE) {
            this.currentDebugView = DEBUG_MODE;
            this.drawAll();
        }
        else {
            updateOnNextFrame.forEach((index) => {
                drawPixel(index, this.grid[index]);
            });
        }
        this.highlightIndex.forEach((index) => {
            drawPixel(index, this.grid[index]);
        });
        this.highlightIndex.clear();
        let x = Math.floor(mouseX / gridWidth);
        let y = Math.floor(mouseY / gridWidth);
        let brushSize = getBrushSize();
        const elementConstructor = Object.getPrototypeOf(currentElement).constructor;
        if (!isInspecting) { // Highlight brush area
            for (let i = x - brushSize; i <= x + brushSize; i++) {
                for (let j = y - brushSize; j <= y + brushSize; j++) {
                    let dx = i - x;
                    let dy = j - y;
                    if (dx * dx + dy * dy <= brushSize * brushSize) {
                        if (this.isValidIndex(i, j)) {
                            const index = j * this.col + i;
                            if (currentElement.constructor.name === "Empty") {
                                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                            }
                            else {
                                ctx.fillStyle = `rgba(${elementConstructor.currentColor[0]}, ${elementConstructor.currentColor[1]}, ${elementConstructor.currentColor[2]}, 0.3)`;
                            }
                            ctx.fillRect(i * gridWidth, j * gridWidth, gridWidth, gridWidth);
                            this.highlightIndex.add(index);
                        }
                    }
                }
            }
        }
        else { // Highlight inspected element
            if (this.isValidIndex(x, y)) {
                const index = y * this.col + x;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.fillRect(x * gridWidth, y * gridWidth, gridWidth, gridWidth);
                this.highlightIndex.add(index);
            }
        }
        // Update the elements on the grid
        this.update();
    }
    drawAll() {
        this.grid.forEach((element, index) => {
            drawPixel(index, element);
        });
    }
    update() {
        if (isPaused) {
            return;
        }
        // update solids and liquid from top to bottom
        for (let i = this.row - 1; i >= 0; i--) {
            for (let j = 0; j < this.col; j++) {
                let rndmOffset = Math.random() > 0.5;
                let colOffset = rndmOffset ? j : -j + this.col - 1;
                let element = this.grid[i * this.col + colOffset];
                if (!(element.gas)) {
                    element.update(this);
                }
            }
        }
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                let rndmOffset = Math.random() > 0.5;
                let colOffset = rndmOffset ? j : -j + this.col - 1;
                let element = this.grid[i * this.col + colOffset];
                if (element.gas) {
                    element.update(this);
                }
            }
        }
    }
}
export default Grid;
