import { focusCanvas } from "../renderer.js";
let existingHelpMenu = null;
function createMenu() {
    let itemMenu = document.createElement('div');
    itemMenu.id = 'help-menu';
    existingHelpMenu = itemMenu;
    document.body.appendChild(itemMenu);
}
function addContent() {
    // Add text to help menu
    let helpText = document.createElement('p');
    helpText.innerHTML = `
        <h1>Welcome 👋</h1>
        <p>Tileo is a sandbox tool, focusing on simulating physics in a grid-based system.</p>
        <br>
        <p>Use the <b>Draw button (D)</b> to select an 'element' to add to the canvas.</p>
        <p>Click and drag on the canvas to draw the selected element.</p>
        <p>You can change the brush using the <b>Change Brush button (C)</b>.</p>
        <p>To cancel drawing, press the <b>Right Mouse Button</b>.</p>
        <br>
        <p>Pan around the canvas by dragging with the <b>Middle Mouse Button</b>.</p>
        <p>Zoom in and out using the <b>Scroll Wheel</b>.</p>
        <br>
        <p>Use the <b>Utility button (U)</b> to access additional tools.</p>
        <br>
        <p>Use the <b>Help button</b> to access this menu.</p>
    `;
    // Close menu button
    let closeButton = document.createElement('button');
    closeButton.id = 'close-help-menu';
    closeButton.textContent = 'Close';
    closeButton.onclick = () => {
        closeHelpMenu();
    };
    existingHelpMenu === null || existingHelpMenu === void 0 ? void 0 : existingHelpMenu.appendChild(helpText);
    helpText.appendChild(closeButton);
}
function openHelpMenu() {
    createMenu();
    addContent();
}
function closeHelpMenu() {
    existingHelpMenu === null || existingHelpMenu === void 0 ? void 0 : existingHelpMenu.remove();
    existingHelpMenu = null;
}
export function toggleHelpMenu(toggle) {
    if (toggle) {
        focusCanvas();
        openHelpMenu();
    }
    else if (toggle === undefined && !existingHelpMenu) {
        focusCanvas();
        openHelpMenu();
    }
    else {
        closeHelpMenu();
    }
}
