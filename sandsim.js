const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w = canvas.width;
let h = canvas.height;
let sqrW = 5;
let row = h / sqrW;
let col = w / sqrW;
let isDragging = false;
let currentElement = 1;
let brushSize = 3;
let brushSpeed = 10;
let brushInterval;
let mouseX, mouseY;
let countl = 0;
let countr = 0;

class Grid {
    initialize() {
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

    setBrush(x, y, element, radius) {
        for (let i = x - radius; i <= x + radius; i++) {
            for (let j = y - radius; j <= y + radius; j++) {
                let dx = i - x;
                let dy = j - y;
                if (dx * dx + dy * dy <= radius * radius) {
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
let grid = new Grid(row, col);

class Element {
    constructor({color, empty, still, liquid, probability, disperse, velocity, acceleration, maxVelocity, falling} = {}) {
        this.color = color ?? [255,255,255];
        this.empty = empty ?? false;
        this.still = still;
        this.liquid = liquid;
        this.falling = falling ?? false;
        this.probability = probability ?? 1;
        this.disperse = disperse ?? 0;
        this.velocity = velocity ?? 0;
        this.acceleration = acceleration ?? 0;
        this.maxVelocity = maxVelocity ?? 0;
    }
    update() {}

    updateVelocity() {}
}

class Sand extends Element {
    constructor() {
        super({
            color: randomColor([255,255,0]), 
            still: false, 
            liquid: false, 
            probability: 0.2,
            velocity: 0,
            maxVelocity: 20,
            acceleration: 5
        });
    }
    update(i) {
        let bottom = i + grid.col;
        if (bottom >= grid.grid.length) {
            return;
        }
        let bottomLeft = bottom - 1;
        let bottomRight = bottom + 1;
        let column = i % grid.col;
        if ((Math.ceil(bottom / grid.row) < grid.row - 1) && (grid.isEmpty(bottom) || grid.isLiquid(bottom))) {
            this.falling = true;
            this.updateVelocity();
        } else {
            this.falling = false;
            this.velocity = 0;
        }

        if (this.falling) {
            for (let m = 0; m < this.velocity/10; m++) {
                if ((Math.ceil((bottom+grid.row) / grid.row) < grid.row - 1) && grid.isEmpty(bottom+grid.row)) {
                    bottom += grid.row;
                } else {
                    break;
                }
            }
            grid.swap(i, bottom);
        } else if ((bottomLeft % grid.col < column && (grid.isEmpty(bottomLeft) || grid.isLiquid(bottomLeft)))) {
                grid.swap(i, bottomLeft);
        } else if (bottomRight % grid.col > column && (grid.isEmpty(bottomRight) || grid.isLiquid(bottomRight))) {
            grid.swap(i, bottomRight);
        } 
    }

    updateVelocity() {
        this.velocity += this.acceleration;
        if (this.velocity > this.maxVelocity) {
            this.velocity = this.maxVelocity;
        }
    }
}

class Wood extends Element {
    constructor() {
        super({color: randomColor([139,69,19]), still: true, liquid: false});
    }

}

class Water extends Element {
    constructor() {
        super({
            color: [0,0,255], 
            still: false, 
            liquid: true, 
            probability: 0.5, 
            disperse: 4,
            maxVelocity: 50,
            acceleration: 5
        });
    }
    update(i) {
        let bottom = i + grid.col;
        if (bottom >= grid.grid.length) {
            return;
        }
        let bottomLeft = bottom - 1;
        let bottomRight = bottom + 1;
        let left = i - 1;
        let right = i + 1;
        let column = i % grid.col;

        if ((Math.ceil(bottom / grid.row) < grid.row - 1) && grid.isEmpty(bottom)) {
            this.falling = true;
            this.updateVelocity();
        } else {
            this.falling = false;
            this.velocity = 0;
        }

        if (this.falling) {
            for (let m = 0; m < this.velocity/10; m++) {
                if ((Math.ceil((bottom+grid.row) / grid.row) < grid.row - 1) && grid.isEmpty(bottom+grid.row)) {
                    bottom += grid.row;
                } else {
                    break;
                }
            }
            grid.swap(i, bottom);
        } else if (bottomLeft % grid.col < column && grid.isEmpty(bottomLeft)) {
            grid.swap(i, bottomLeft);
        } else if (bottomRight % grid.col > column && grid.isEmpty(bottomRight)) {
            grid.swap(i, bottomRight);
        } else if ((column > 0 && grid.isEmpty(left))) {
            for (let m = 0; m < this.disperse; m++) {
                if (column > m + 1 && grid.isEmpty(left-1)) {
                    left--;
                } else {
                    break;
                };
            }
            grid.swap(i, left);
        } else if (column < grid.col - 1 && grid.isEmpty(right)) {
            for (let m = 0; m < this.disperse; m++) {
                if (column < grid.col - m - 2 && grid.isEmpty(right+1)) {
                    right++;
                } else {
                    break;
                };
            }
            grid.swap(i, right);
        } 
    }
    updateVelocity() {
        this.velocity += this.acceleration;
        if (this.velocity > this.maxVelocity) {
            this.velocity = this.maxVelocity;
        }
    }
}

class Empty extends Element {
    static baseColor = [0,0,0];
    constructor() {
        super({empty: true});
    }
}

function randomColor(color) {
    let randomDarkness = Math.random() * (0.9-0.8) + 0.8;
    return color.map(c => c * ((Math.random() * (1-0.85) + 0.85)) * randomDarkness);
}

function drawPixel(index, element) {
    if (element.empty) {
        ctx.fillStyle = `rgb(${Empty.baseColor[0]}, ${Empty.baseColor[1]}, ${Empty.baseColor[2]})`;
    } else {
        ctx.fillStyle = `rgb(${element.color[0]}, ${element.color[1]}, ${element.color[2]})`;
    }
    ctx.fillRect((index % col) * sqrW, Math.floor(index / col) * sqrW, sqrW, sqrW);

}

function render() {
    grid.draw();
    requestAnimationFrame(() => render());
}

canvas.addEventListener('mousedown', function () {
    brushInterval = setInterval(() => {
        let i = Math.floor(mouseX / sqrW);
        let j = Math.floor(mouseY / sqrW);

        if (i >= 0 && i < col && j >= 0 && j < row) {
            switch (currentElement) {
                case 1:
                    grid.setBrush(i, j, new Sand(), brushSize);
                    break;
                case 2:
                    grid.setBrush(i, j, new Wood(), brushSize);
                    break;
                case 3:
                    grid.setBrush(i, j, new Water(), brushSize);
                    break;
                default:
                    grid.setBrush(i, j, new Empty(), brushSize);
            }
        }
    }, brushSpeed);
});

canvas.addEventListener('mouseup', function () {
    clearInterval(brushInterval);
});

canvas.addEventListener('mousemove', function (e) {
    let rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

canvas.addEventListener('mouseleave', function () {
    clearInterval(brushInterval);
});

document.getElementById('reset').addEventListener('click', function () {
    grid.reset();
});

document.getElementById('sand').addEventListener('click', function () {
    currentElement = 1;
    document.getElementById('selected').textContent = 'Selected: Sand'
});

document.getElementById('wood').addEventListener('click', function () {
    currentElement = 2;
    document.getElementById('selected').textContent = 'Selected: Wood';
});

document.getElementById('water').addEventListener('click', function () {
    currentElement = 3;
    document.getElementById('selected').textContent = 'Selected: Water'
});

document.getElementById('plusbrush').addEventListener('click', function () {
    brushSize++;
    document.getElementById('brush').textContent = 'Brush Size: ' + brushSize;
});

document.getElementById('minusbrush').addEventListener('click', function () {
    brushSize--;
    document.getElementById('brush').textContent = 'Brush Size: ' + brushSize;
});

window.onload = () => {
    grid.initialize();
    render();
};