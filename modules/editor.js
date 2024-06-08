import { currentElement } from './controls.js';
import { parseColor } from './utils.js';

function enableInputs(inputs) {
    inputs.forEach((input) => {
        if (input) {
            input.disabled = false;
        }
    });
}

function disableInputs(inputs) {
    inputs.forEach((input) => {
        if (input) {
            if (input.type === 'color') {
                input.value = '#ffffff';
            } else {
                input.value = null;
            }
            input.disabled = true;
        }
    });
}

function getInputElements() {
    return new Map([
        ['elementName', document.getElementById('elementName')],
        ['elementLife', document.getElementById('elementLife')],
        ['elementReduction', document.getElementById('elementReduction')],
        ['elementFireSpread', document.getElementById('elementFireSpread')],
        ['elementColor', document.getElementById('elementColor')],
        ['elementFlammable', document.getElementById('elementFlammable')],
        ['elementMaxSpeed', document.getElementById('elementMaxSpeed')],
        ['elementAcceleration', document.getElementById('elementAcceleration')],
        ['elementDispersion', document.getElementById('elementDispersion')],
        ['elementBrushProbability', document.getElementById('elementBrushProbability')]
    ]);
}

export function setupEditor() {
    document.getElementById('elementName').addEventListener('input', function (event) {
        let value = event.target.value || '?';
        document.getElementById(currentElement.constructor.name.toLowerCase()).textContent = value;
    });

    document.getElementById('elementLife').addEventListener('input', function (event) {
        currentElement.setLife(Math.max(1, parseFloat(event.target.value)));
    });

    document.getElementById('elementReduction').addEventListener('input', function (event) {
        currentElement.setReduction(parseFloat(event.target.value));
    });

    document.getElementById('elementFireSpread').addEventListener('input', function (event) {
        currentElement.setChanceToSpread(Math.min(1, parseFloat(event.target.value)));
    });

    document.getElementById('elementColor').addEventListener('input', function (event) {
        currentElement.setColor(parseColor(event.target.value));
    });

    document.getElementById('elementMaxSpeed').addEventListener('input', function (event) {
        currentElement.setMaxSpeed(Math.max(0, parseFloat(event.target.value)));
    });

    document.getElementById('elementAcceleration').addEventListener('input', function (event) {
        currentElement.setAcceleration(Math.max(0, parseFloat(event.target.value)));
    });

    document.getElementById('elementDispersion').addEventListener('input', function (event) {
        currentElement.setDispersion(Math.min(20, parseFloat(event.target.value)));
    });

    document.getElementById('elementBrushProbability').addEventListener('input', function (event) {
        currentElement.setProbability(Math.min(1, parseFloat(event.target.value)));
    });

    document.getElementById('resetSettings').addEventListener('click', function () {
        if (currentElement.empty) {
            return;
        }
        currentElement.resetDefaults();
        document.getElementById(currentElement.constructor.name.toLowerCase()).textContent = currentElement.constructor.name;
        updateHTMLValues();
    });
}

export function updateHTMLValues() {
    let inputElements = getInputElements();

    enableInputs(inputElements.values());

    if (!currentElement.empty) {
        inputElements.get('elementName').value = document.getElementById(currentElement.constructor.name.toLowerCase()).textContent;
    } else {
        disableInputs(inputElements.values());
        return;
    }
    inputElements.delete('elementName')
    inputElements.get('elementColor').value = '#' + currentElement.constructor.currentColor.map(val => Math.floor(val).toString(16).padStart(2, '0')).join('');
    inputElements.delete('elementColor');
    inputElements.get('elementBrushProbability').value = currentElement.constructor.currentProbability;
    inputElements.delete('elementBrushProbability');

    if (currentElement.behavioursLookup['Life'] || currentElement.behavioursLookup['Burning']) {
        inputElements.get('elementLife').value = currentElement.constructor.currentLife;
        inputElements.get('elementReduction').value = currentElement.constructor.currentReduction;
        inputElements.delete('elementLife');
        inputElements.delete('elementReduction');
    }
    if (currentElement.behavioursLookup['Burning']) {
        inputElements.get('elementFireSpread').value = currentElement.behavioursLookup['Burning'].chanceToSpread;
        inputElements.delete('elementFireSpread');
    }
    if (currentElement.behavioursLookup['SolidMove'] || currentElement.behavioursLookup['WaterMove'] || currentElement.behavioursLookup['GasMove']) {
        inputElements.get('elementMaxSpeed').value = currentElement.constructor.currentMaxSpeed
        inputElements.get('elementAcceleration').value = currentElement.constructor.currentAcceleration;
        inputElements.delete('elementMaxSpeed');
        inputElements.delete('elementAcceleration');
    }
    if (currentElement.behavioursLookup['GasMove'] || currentElement.behavioursLookup['WaterMove']) {
        inputElements.get('elementDispersion').value = currentElement.constructor.currentDispersion;
        inputElements.delete('elementDispersion');
    }

    disableInputs(inputElements.values());

}
