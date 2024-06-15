import { drawPixel, gridWidth, col, row, ctx, updateOnNextFrame } from './renderer.js';
import { currentElement, brushSize, mouseX, mouseY } from './controls.js';
import { ALLOW_REPLACEMENT, isPaused, DEBUG_LIFE, DEBUG_MOVEMENT, DEBUG_VELOCITY } from './config.js';
import { Sand, Water, Fire, Smoke, Wood, Stone, Custom, Empty } from './elements/ElementIndex.js';
var Grid = /** @class */ (function () {
    function Grid() {
    }
    Grid.prototype.initialize = function (row, col) {
        this.row = row;
        this.col = col;
        this.grid = new Array(row * col);
        for (var i = 0; i < row * col; i++) {
            this.grid[i] = new Empty(i);
        }
        this.drawAll();
        this.highlightIndex = new Set();
        this.debugView = false;
    };
    Grid.prototype.reset = function () {
        this.grid = new Array(row * col);
        for (var i = 0; i < row * col; i++) {
            this.grid[i] = new Empty(i);
        }
        this.drawAll();
    };
    Grid.prototype.fill = function () {
        for (var i = 0; i < row * col; i++) {
            var newElement = currentElement.constructor(i);
            this.setIndex(i, newElement);
            this.grid[i] = newElement;
        }
        this.drawAll();
    };
    Grid.prototype.updateColor = function () {
        this.grid.forEach(function (element, index) {
            if (element.constructor.name === "Empty") {
                element.setColor(Empty.currentColor);
                updateOnNextFrame.add(index);
            }
        });
    };
    Grid.prototype.removeIndex = function (i) {
        this.grid[i] = new Empty(i);
    };
    Grid.prototype.get = function (i) {
        return this.grid[i];
    };
    Grid.prototype.setIndex = function (i, element) {
        element.index = i;
    };
    Grid.prototype.setElement = function (x, y, element) {
        var newElement;
        // This switch statement is very annoying but cannot seem to get around typescript not
        // liking to construct using element constructor for all types.
        switch (element.constructor.name) {
            case "Empty":
                newElement = new Empty(y * this.col + x);
                break;
            case "Sand":
                newElement = new Sand(y * this.col + x);
                break;
            case "Water":
                newElement = new Water(y * this.col + x);
                break;
            case "Wood":
                newElement = new Wood(y * this.col + x);
                break;
            case "Fire":
                newElement = new Fire(y * this.col + x);
                break;
            case "Smoke":
                newElement = new Smoke(y * this.col + x);
                break;
            case "Stone":
                newElement = new Stone(y * this.col + x);
                break;
            case "Custom":
                newElement = new Custom(y * this.col + x);
                break;
            default:
                newElement = new Empty(y * this.col + x);
        }
        this.grid[y * this.col + x] = newElement;
        updateOnNextFrame.add(y * this.col + x);
    };
    Grid.prototype.setBrush = function (x, y) {
        var elementConstructor = currentElement.constructor(0).constructor;
        for (var i = x - brushSize; i <= x + brushSize; i++) {
            for (var j = y - brushSize; j <= y + brushSize; j++) {
                var dx = i - x;
                var dy = j - y;
                if (dx * dx + dy * dy <= brushSize * brushSize) {
                    if (this.isValidIndex(i, j)) {
                        if (currentElement.constructor.name === "Empty") {
                            this.removeIndex(j * this.col + i);
                        }
                        if (Math.random() < elementConstructor.currentProbability) {
                            if (ALLOW_REPLACEMENT || (this.get(j * this.col + i).constructor.name !== currentElement.constructor.name && this.isEmpty(j * this.col + i))) {
                                var newElement = currentElement instanceof Empty ? new Empty(j * this.col + i) : currentElement.constructor(j * this.col + i);
                                this.setIndex(j * this.col + i, newElement);
                                this.setElement(i, j, newElement);
                            }
                        }
                    }
                }
            }
        }
    };
    Grid.prototype.swap = function (a, b) {
        if (this.grid[a] instanceof Empty && this.grid[b] instanceof Empty) {
            return;
        }
        var temp = this.grid[a];
        this.setIndex(a, this.grid[b]);
        this.setIndex(b, temp);
        this.grid[a] = this.grid[b];
        this.grid[b] = temp;
        updateOnNextFrame.add(a);
        updateOnNextFrame.add(b);
        drawPixel(a, this.grid[a]);
        drawPixel(b, this.grid[b]);
    };
    Grid.prototype.isEmpty = function (i) {
        return this.grid[i] instanceof Empty;
    };
    Grid.prototype.isLiquid = function (i) {
        return this.grid[i].liquid;
    };
    Grid.prototype.isGas = function (i) {
        return this.grid[i].gas;
    };
    Grid.prototype.isPassable = function (i) {
        return this.grid[i] instanceof Empty || this.grid[i].liquid || this.grid[i].gas;
    };
    Grid.prototype.isValidIndex = function (x, y) {
        return x >= 0 && x < this.col && y >= 0 && y < this.row;
    };
    Grid.prototype.draw = function () {
        var _this = this;
        if (this.debugView !== (DEBUG_LIFE || DEBUG_MOVEMENT || DEBUG_VELOCITY)) {
            this.debugView = DEBUG_LIFE || DEBUG_MOVEMENT || DEBUG_VELOCITY;
            this.drawAll();
        }
        else if (this.debugView) {
            this.drawAll();
        }
        else {
            updateOnNextFrame.forEach(function (index) {
                drawPixel(index, _this.grid[index]);
            });
        }
        this.highlightIndex.forEach(function (index) {
            drawPixel(index, _this.grid[index]);
        });
        this.highlightIndex.clear();
        var x = Math.floor(mouseX / gridWidth);
        var y = Math.floor(mouseY / gridWidth);
        var elementConstructor = currentElement.constructor(0).constructor;
        for (var i = x - brushSize; i <= x + brushSize; i++) {
            for (var j = y - brushSize; j <= y + brushSize; j++) {
                var dx = i - x;
                var dy = j - y;
                if (dx * dx + dy * dy <= brushSize * brushSize) {
                    if (this.isValidIndex(i, j)) {
                        if (currentElement.constructor.name === "Empty") {
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                        }
                        else {
                            ctx.fillStyle = "rgba(".concat(elementConstructor.currentColor[0], ", ").concat(elementConstructor.currentColor[1], ", ").concat(elementConstructor.currentColor[2], ", 0.3)");
                        }
                        ctx.fillRect(i * gridWidth, j * gridWidth, gridWidth, gridWidth);
                        this.highlightIndex.add(j * this.col + i);
                    }
                }
            }
        }
        this.update();
    };
    Grid.prototype.drawAll = function () {
        this.grid.forEach(function (element, index) {
            drawPixel(index, element);
        });
    };
    Grid.prototype.update = function () {
        if (isPaused) {
            return;
        }
        // update solids and liquid from top to bottom
        for (var i = Math.floor(this.grid.length / this.col) - 1; i >= 0; i--) {
            for (var j = 0; j < this.col; j++) {
                var rndmOffset = Math.random() > 0.5;
                var colOffset = rndmOffset ? j : -j + this.col - 1;
                var element = this.grid[i * this.col + colOffset];
                if (!(element.gas)) {
                    element.update(this);
                }
            }
        }
        for (var i = 0; i < Math.floor(this.grid.length / this.col); i++) {
            for (var j = 0; j < this.col; j++) {
                var rndmOffset = Math.random() > 0.5;
                var colOffset = rndmOffset ? j : -j + this.col - 1;
                var element = this.grid[i * this.col + colOffset];
                if (element.gas) {
                    element.update(this);
                }
            }
        }
    };
    return Grid;
}());
export default Grid;
