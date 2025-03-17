import { currentElement } from '../controls.js';
import { parseColor } from '../utils.js';
import Empty from '../elements/misc/empty.js';

function enableInputs(inputs: IterableIterator<HTMLInputElement>) {
    Array.from(inputs).forEach((input) => {
        if (input) {
            input.disabled = false;
        }
    });
}

function disableInputs(inputs: IterableIterator<HTMLInputElement>) {
    Array.from(inputs).forEach((input) => {
        if (input) {
            if (input.type === 'color') {
                input.value = '#ffffff';
            } else {
                input.value = '';
            }
            input.disabled = true;
        }
    });
}

function getInputElements(): Map<string, HTMLInputElement> {
    return new Map([
        ['elementName', document.getElementById('elementName') as HTMLInputElement],
        ['elementLife', document.getElementById('elementLife') as HTMLInputElement],
        ['elementReduction', document.getElementById('elementReduction') as HTMLInputElement],
        ['elementFireSpread', document.getElementById('elementFireSpread') as HTMLInputElement],
        ['elementColor', document.getElementById('elementColor') as HTMLInputElement],
        ['elementFlammable', document.getElementById('elementFlammable') as HTMLInputElement],
        ['elementMaxSpeed', document.getElementById('elementMaxSpeed') as HTMLInputElement],
        ['elementAcceleration', document.getElementById('elementAcceleration') as HTMLInputElement],
        ['elementDispersion', document.getElementById('elementDispersion') as HTMLInputElement],
        ['elementBrushProbability', document.getElementById('elementBrushProbability') as HTMLInputElement]
    ]);
}

export function setupEditor() {

    document.getElementById('elementName')!.addEventListener('input', function (event) {
        let target = event.target as HTMLInputElement;
        let value = target.value || '?';
        document.getElementById(currentElement.constructor.name.toLowerCase())!.textContent = value;
    });

    document.getElementById('elementLife')!.addEventListener('input', function (event: Event) {
        let target = event.target as HTMLInputElement;
        currentElement.constructor(0).setLife(Math.max(1, parseFloat(target.value)));
    });

    document.getElementById('elementReduction')!.addEventListener('input', function (event: Event) {
        let target = event.target as HTMLInputElement;
        currentElement.constructor(0).setReduction(parseFloat(target.value));
    });

    document.getElementById('elementFireSpread')!.addEventListener('input', function (event: Event) {
        let target = event.target as HTMLInputElement;
        currentElement.constructor(0).setChanceToSpread(Math.min(1, parseFloat(target.value)));
    });

    document.getElementById('elementColor')!.addEventListener('input', function (event: Event) {
        let target = event.target as HTMLInputElement;
        currentElement.constructor(0).setColor(parseColor(target.value));
    });

    document.getElementById('elementMaxSpeed')!.addEventListener('input', function (event: Event) {
        let target = event.target as HTMLInputElement;
        currentElement.constructor(0).setMaxSpeed(Math.max(0, parseFloat(target.value)));
    });

    document.getElementById('elementAcceleration')!.addEventListener('input', function (event: Event) {
        let target = event.target as HTMLInputElement;
        currentElement.constructor(0).setAcceleration(Math.max(0, parseFloat(target.value)));
    });

    document.getElementById('elementDispersion')!.addEventListener('input', function (event: Event) {
        let target = event.target as HTMLInputElement;
        currentElement.constructor(0).setDispersion(Math.min(20, parseFloat(target.value)));
    });

    document.getElementById('elementBrushProbability')!.addEventListener('input', function (event: Event) {
        let target = event.target as HTMLInputElement;
        currentElement.constructor(0).setProbability(Math.min(1, parseFloat(target.value)));
    });

    document.getElementById('resetSettings')!.addEventListener('click', function () {
        if (currentElement instanceof Empty) {
            return;
        }
        currentElement.constructor(0).resetDefaults();
        document.getElementById(currentElement.constructor.name.toLowerCase())!.textContent = currentElement.constructor.name;
        updateHTMLValues();
    });
}

export function updateHTMLValues() {
    let inputElements = getInputElements();

    enableInputs(inputElements.values());

    if (!(currentElement instanceof Empty)) {
        const elementName: HTMLInputElement = inputElements.get('elementName') as HTMLInputElement;
        const elementButton: HTMLButtonElement = document.getElementById(currentElement.constructor.name.toLowerCase()) as HTMLButtonElement;
        elementName.value = elementButton.textContent || '';
    } else {
        disableInputs(inputElements.values());
        return;
    }

    const elementConstructor = Object.getPrototypeOf(currentElement).constructor
    const elementInstance = new elementConstructor(0);


    inputElements.delete('elementName')
    inputElements.get('elementColor')!.value = '#' + elementConstructor.currentColor.map((val: number) => Math.floor(val).toString(16).padStart(2, '0')).join('');
    inputElements.delete('elementColor');
    inputElements.get('elementBrushProbability')!.value = elementConstructor.currentProbability.toString();
    inputElements.delete('elementBrushProbability');

    if (elementInstance.behavioursLookup['Life'] || elementInstance.behavioursLookup['Burning']) {
        inputElements.get('elementLife')!.value = elementConstructor.currentLife;
        inputElements.get('elementReduction')!.value = elementConstructor.currentReduction;
        inputElements.delete('elementLife');
        inputElements.delete('elementReduction');
    }
    if (elementInstance.behavioursLookup['Burning']) {
        inputElements.get('elementFireSpread')!.value = elementInstance.behavioursLookup['Burning'].chanceToSpread;
        inputElements.delete('elementFireSpread');
    }
    if (elementInstance.behavioursLookup['SolidMove'] || elementInstance.behavioursLookup['WaterMove'] || elementInstance.behavioursLookup['GasMove']) {
        inputElements.get('elementMaxSpeed')!.value = elementConstructor.currentMaxSpeed.toString();
        inputElements.get('elementAcceleration')!.value = elementConstructor.currentAcceleration.toString();
        inputElements.delete('elementMaxSpeed');
        inputElements.delete('elementAcceleration');
    }
    if (elementInstance.behavioursLookup['GasMove'] || elementInstance.behavioursLookup['WaterMove']) {
        inputElements.get('elementDispersion')!.value = elementConstructor.currentDispersion.toString();
        inputElements.delete('elementDispersion');
    }

    disableInputs(inputElements.values());

}
