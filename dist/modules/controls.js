import { Sand, Water, Fire, Smoke, Wood, Stone, Custom, Empty } from './elements/ElementIndex.js';
import { gridWidth, col, row, grid } from './renderer.js';
import { updateHTMLValues } from './editor.js';
var brushSpeed = 10;
var brushSize = 4;
var brushInterval;
var currentElement = new Sand(0);
var mouseX;
var mouseY;
export function setupControls() {
    var canvas = document.getElementById('canvas');
    var resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', function () {
        grid.reset();
    });
    var fillButton = document.getElementById('fillgrid');
    fillButton.addEventListener('click', function () {
        grid.fill();
    });
    canvas.addEventListener('mousedown', function (e) {
        var rect = canvas.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) * (800 / canvas.clientWidth);
        mouseY = (e.clientY - rect.top) * (800 / canvas.clientWidth);
        brushInterval = setInterval(function () {
            var i = Math.floor(mouseX / gridWidth);
            var j = Math.floor(mouseY / gridWidth);
            if (i >= 0 && i < col && j >= 0 && j < row) {
                grid.setBrush(i, j);
            }
        }, brushSpeed);
    });
    canvas.addEventListener('mouseup', function () {
        clearInterval(brushInterval);
    });
    canvas.addEventListener('mousemove', function (e) {
        var rect = canvas.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) * (800 / canvas.clientWidth);
        mouseY = (e.clientY - rect.top) * (800 / canvas.clientWidth);
        // Calculate the grid position of the mouse
        var i = Math.floor(mouseX / gridWidth);
        var j = Math.floor(mouseY / gridWidth);
        if (i >= 0 && i < col && j >= 0 && j < row) {
            var mousePosition = document.getElementById('mousePosition');
            mousePosition.textContent = "Mouse position: ".concat(i, ", ").concat(j);
        }
    });
    canvas.addEventListener('mouseleave', function () {
        clearInterval(brushInterval);
    });
    var controls = {
        'sand': function () { return new Sand(0); },
        'wood': function () { return new Wood(0); },
        'water': function () { return new Water(0); },
        'smoke': function () { return new Smoke(0); },
        'stone': function () { return new Stone(0); },
        'fire': function () { return new Fire(0); },
        'custom': function () { return new Custom(0); },
        'eraser': function () { return new Empty(0); },
    };
    Object.keys(controls).forEach(function (controlId) {
        var button = document.getElementById(controlId);
        button.addEventListener('click', function () {
            Object.keys(controls).forEach(function (id) {
                var elementButton = document.getElementById(id);
                elementButton.classList.remove('button-selected');
            });
            button.classList.add('button-selected');
            currentElement = controls[controlId]();
            localStorage.setItem('currentElement', controlId);
            var selected = document.getElementById('selected');
            selected.textContent = "Selected: ".concat(controlId.charAt(0).toUpperCase() + controlId.slice(1));
            updateHTMLValues();
        });
    });
    var brushControls = {
        'plusbrush': function () { return brushSize++; },
        'minusbrush': function () { return brushSize = Math.max(0, brushSize - 1); },
    };
    Object.keys(brushControls).forEach(function (controlId) {
        var button = document.getElementById(controlId);
        button.addEventListener('click', function () {
            brushControls[controlId]();
            localStorage.setItem('brushSize', brushSize.toString());
            var brush = document.getElementById('brush');
            brush.textContent = "Brush Size: ".concat(brushSize + 1);
        });
    });
    var storedElement = localStorage.getItem('currentElement') || 'sand';
    currentElement = controls[storedElement]();
    var selected = document.getElementById('selected');
    selected.textContent = "Selected: ".concat(storedElement.charAt(0).toUpperCase() + storedElement.slice(1));
    var storedElementButton = document.getElementById(storedElement);
    storedElementButton.classList.add('button-selected');
    updateHTMLValues();
    var storedBrushSize = localStorage.getItem('brushSize') || '4';
    brushSize = parseInt(storedBrushSize);
    var brush = document.getElementById('brush');
    brush.textContent = "Brush Size: ".concat(brushSize + 1);
}
export { currentElement, brushSize, mouseX, mouseY };
