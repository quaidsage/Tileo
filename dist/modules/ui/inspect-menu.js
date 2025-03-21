import { grid } from '../renderer.js';
export function drawElementInfo(i, j, e, currentElementInfo) {
    // Get element from grid based on mouse position
    let element = grid.getElement(i, j);
    if (element) {
        // Get element constructor and instance for details
        const elementConstructor = Object.getPrototypeOf(element).constructor;
        const elementInstance = new elementConstructor(0);
        // Get element details menu
        let elementDetails = document.getElementById('element-details-menu');
        if (elementConstructor.name === 'Empty') {
            elementDetails.style.display = 'none';
            return;
        }
        else {
            elementDetails.style.display = 'block';
        }
        // Calculate the position of the details menu
        let left = e.clientX + 10;
        let top = e.clientY + 10;
        // Adjust position if the menu is off-screen
        if (left + elementDetails.offsetWidth > window.innerWidth) {
            left = window.innerWidth - elementDetails.offsetWidth - 10;
        }
        if (top + elementDetails.offsetHeight > window.innerHeight) {
            top = window.innerHeight - elementDetails.offsetHeight - 10;
        }
        elementDetails.style.left = `${left}px`;
        elementDetails.style.top = `${top}px`;
        // Get changing properties of element from behaviours
        let velocity = 'N/A';
        let life = 'N/A';
        element.behaviours.forEach(behaviour => {
            switch (behaviour.constructor.name) {
                case 'SolidMove':
                    velocity = (behaviour.velocity).toFixed(2);
                    break;
                case 'WaterMove':
                    velocity = (behaviour.velocity).toFixed(2);
                    break;
                case 'GasMove':
                    velocity = (behaviour.velocity).toFixed(2);
                    break;
                case 'Burning':
                    life = (behaviour.life).toFixed(2);
                    break;
                case 'Life':
                    life = (behaviour.life).toFixed(2);
                    break;
                default:
                    break;
            }
        });
        // Get type of element
        let elementType;
        if (element.solid) {
            elementType = 'Solid';
        }
        else if (element.liquid) {
            elementType = 'Liquid';
        }
        else if (element.gas) {
            elementType = 'Gas';
        }
        else {
            elementType = 'N/A';
        }
        // Get behaviours of element, turn into a string
        let behaviours = '';
        element.behaviours.forEach(behaviour => {
            behaviours += `${behaviour.constructor.name}, `;
        });
        behaviours = behaviours.slice(0, -2);
        // Add information on element to details menu
        let elementDetailsContent = document.getElementById('element-details-content');
        elementDetailsContent.innerHTML = `<p>Element: ${elementConstructor.name || 'N/A'}</p>
            <p>x: ${i || 'N/A'}, y: ${j || 'N/A'}</p>
            <p>Type: ${elementType || 'N/A'}</p>
            <p>Color: ${'#' + elementConstructor.currentColor.map((val) => Math.floor(val).toString(16).padStart(2, '0')).join('') || 'N/A'}</p>
            <p>On Fire: ${elementInstance.behavioursLookup['Burning'] ? (`${element.onFire ? 'Yes' : 'No'}`) : 'Immune'}</p>
            <p>Velocity: ${velocity ? velocity : 'N/A'}</p>
            <p>Acceleration: ${elementConstructor.currentAcceleration || 'N/A'}</p>
            <p>Max Speed: ${elementConstructor.currentMaxSpeed || 'N/A'}</p>
            <p>Dispersion: ${elementConstructor.currentDispersion || 'N/A'}</p>
            <p>Life: ${life || 'N/A'}</p>
            <p>Reduction: ${elementConstructor.currentReduction || 'N/A'}</p>
            <p>Fire Spread: ${elementInstance.behavioursLookup['Burning'] ? elementInstance.behavioursLookup['Burning'].chanceToSpread : 'N/A'}</p>
            <p>Behaviours: ${behaviours}</p>`;
        // Update reference to menu to current
        currentElementInfo = elementDetails;
    }
}
