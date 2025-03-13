import Element from './elements/element.js';
import { drawPixel, gridWidth, col, row, ctx, updateOnNextFrame } from './renderer.js';
import { currentElement, brushSize, mouseX, mouseY } from './controls.js';
import { ALLOW_REPLACEMENT, isPaused, DEBUG_LIFE, DEBUG_MOVEMENT, DEBUG_VELOCITY } from './config.js';
import { Sand, Water, Fire, Smoke, Wood, Stone, Custom, Empty } from './elements/ElementIndex.js';


class Grid {
    row!: number;
    col!: number;
    grid!: Element[];
    highlightIndex!: Set<number>;
    debugView!: boolean;
    currentElement!: Element;

    initialize(row: number, col: number) {
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

    removeIndex(i: number) {
        this.grid[i] = new Empty(i);
    }

    get(i: number) {
        return this.grid[i];
    }

    setIndex(i: number, element: Element) {
        element.index = i;
    }

    setElement(x: number, y: number, element: Element) {
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

    setBrush(x: number, y: number) {
        const elementConstructor = Object.getPrototypeOf(currentElement).constructor;

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

    swap(a: number, b: number) {
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

    isEmpty(i: number) {
        return this.grid[i] instanceof Empty;
    }

    isLiquid(i: number) {
        return this.grid[i].liquid;
    }

    isGas(i: number) {
        return this.grid[i].gas;
    }

    isPassable(i: number) {
        return this.grid[i] instanceof Empty || this.grid[i].liquid || this.grid[i].gas;
    }

    isValidIndex(x: number, y: number) {
        return x >= 0 && x < this.col && y >= 0 && y < this.row;
    }

    draw() {
        if (this.debugView !== (DEBUG_LIFE || DEBUG_MOVEMENT || DEBUG_VELOCITY)) {
            this.debugView = DEBUG_LIFE || DEBUG_MOVEMENT || DEBUG_VELOCITY;
            this.drawAll();
        } else if (this.debugView) {
            this.drawAll();
        } else {
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

        const elementConstructor = Object.getPrototypeOf(currentElement).constructor

        for (let i = x - brushSize; i <= x + brushSize; i++) {
            for (let j = y - brushSize; j <= y + brushSize; j++) {
                let dx = i - x;
                let dy = j - y;
                if (dx * dx + dy * dy <= brushSize * brushSize) {
                    if (this.isValidIndex(i, j)) {
                        const index = j * this.col + i;
                        if (currentElement.constructor.name === "Empty") {
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                        } else {
                            ctx.fillStyle = `rgba(${elementConstructor.currentColor[0]}, ${elementConstructor.currentColor[1]}, ${elementConstructor.currentColor[2]}, 0.3)`;
                        }
                        ctx.fillRect(i * gridWidth, j * gridWidth, gridWidth, gridWidth);
                        this.highlightIndex.add(index);
                    }
                }
            }
        }

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
