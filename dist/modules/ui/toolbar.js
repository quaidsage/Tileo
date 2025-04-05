import { Sand, Water, Fire, Smoke, Wood, Stone, Custom, Empty } from '../elements/ElementIndex.js';
import { setCurrentElement, toggleInspect } from '../controls.js';
import { DebugOptions, toggleDebug, togglePause, isTouch } from '../config.js';
import { toggleBrushMenu } from './brush-menu.js';
import { focusCanvas, importGridSave } from '../renderer.js';
import { toggleHelpMenu } from './help-menu.js';
import { grid } from '../renderer.js';
import Grid from '../grid.js';
var MenuType;
(function (MenuType) {
    MenuType[MenuType["PLACE"] = 0] = "PLACE";
    MenuType[MenuType["UTILITY"] = 1] = "UTILITY";
})(MenuType || (MenuType = {}));
let save;
const controls = {
    'sand': () => new Sand(0),
    'wood': () => new Wood(0),
    'water': () => new Water(0),
    'smoke': () => new Smoke(0),
    'stone': () => new Stone(0),
    'fire': () => new Fire(0),
    'custom': () => new Custom(0),
    'eraser': () => new Empty(0),
};
let placeItems = ['Sand', 'Wood', 'Water', 'Smoke', 'Stone', 'Fire', 'Custom', 'Eraser'];
let utilityItems = ['Pause (Space)', 'Save', 'Load', 'Clear Save', 'Debug Velocity', 'Debug Movement', 'Debug Life'];
let existingMenu = null;
let existingMenuType = null;
// Adds buttons to the menu based on the type of menu
function addItems(itemMenu, menuType) {
    let item;
    switch (menuType) {
        case MenuType.PLACE:
            placeItems.forEach(element => {
                const item = document.createElement('button');
                item.textContent = element;
                item.addEventListener('click', function () {
                    toggleInspect(false);
                    // 'Toggle' selected button to apply appropriate styling
                    const menuItems = itemMenu.querySelectorAll('.menu-item');
                    menuItems.forEach(menuItem => menuItem.classList.remove('active'));
                    item.classList.add('active');
                    setCurrentElement(controls[element.toLowerCase()]());
                    this.blur();
                });
                item.className = 'menu-item';
                itemMenu.appendChild(item);
            });
            break;
        case MenuType.UTILITY:
            utilityItems.forEach(element => {
                item = document.createElement('button');
                item.textContent = element;
                item.addEventListener('click', function () {
                    switch (element) {
                        case 'Pause (Space)':
                            togglePause();
                            break;
                        case 'Clear Save':
                            localStorage.clear();
                            location.reload();
                            break;
                        case 'Debug Velocity':
                            toggleDebug(DebugOptions.VELOCITY);
                            break;
                        case 'Debug Movement':
                            toggleDebug(DebugOptions.MOVEMENT);
                            break;
                        case 'Debug Life':
                            toggleDebug(DebugOptions.LIFE);
                            break;
                        case 'Save':
                            save = new Grid();
                            save.initialize(grid.row, grid.col);
                            save.grid = grid.grid.map((element, index) => {
                                let constructor = Object.getPrototypeOf(element).constructor;
                                return new constructor(index);
                            });
                            break;
                        case 'Load':
                            let importedGrid = new Grid();
                            importedGrid.initialize(save.row, save.col);
                            importedGrid.grid = save.grid.map((element, index) => {
                                let constructor = Object.getPrototypeOf(element).constructor;
                                return new constructor(index);
                            });
                            importGridSave(importedGrid);
                            break;
                        default:
                            break;
                    }
                    this.blur();
                });
                item.className = 'menu-item';
                itemMenu.appendChild(item);
            });
            break;
    }
}
// Positions the menu based on the button's position in toolbar 
function positionMenu(itemMenu, menuType) {
    // Update y position of menu based on toolbar position
    itemMenu.style.top = `${document.getElementById('toolbar').getBoundingClientRect().top + 5}px`;
    itemMenu.style.transform = `translateY(-100%)`;
    let button;
    switch (menuType) {
        case MenuType.PLACE:
            button = document.getElementById('place-button');
            break;
        case MenuType.UTILITY:
            button = document.getElementById('utility-button');
            break;
        default:
            return;
    }
    const buttonRect = button.getBoundingClientRect();
    itemMenu.style.left = `${buttonRect.left}px`;
}
// Creates a menu that will display various buttons based on the type of menu
function createMenu(menuType) {
    let itemMenu = document.createElement('div');
    itemMenu.id = 'item-menu';
    positionMenu(itemMenu, menuType);
    addItems(itemMenu, menuType);
    document.body.appendChild(itemMenu);
    return itemMenu;
}
// Opens a menu based on the type of menu
function openMenu(menuType) {
    if (existingMenuType === menuType) {
        existingMenu === null || existingMenu === void 0 ? void 0 : existingMenu.remove();
        existingMenuType = null;
        return;
    }
    if (existingMenu) {
        existingMenu.remove();
    }
    switch (menuType) {
        case MenuType.PLACE:
            existingMenu = createMenu(menuType);
            break;
        case MenuType.UTILITY:
            existingMenu = createMenu(menuType);
            break;
    }
    existingMenuType = menuType;
}
// Assign functionality to toolbar buttons
export function setupToolbar() {
    // Bind functions to pressing of toolbar buttons
    let placeButton = document.getElementById('place-button');
    placeButton.addEventListener('click', function () {
        toggleDrawMenu();
        this.blur();
    });
    let brushButton = document.getElementById('change-brush-button');
    brushButton.addEventListener('click', function () {
        toggleBrushMenu();
        this.blur();
    });
    let utilityButton = document.getElementById('utility-button');
    utilityButton.addEventListener('click', function () {
        toggleUtilityMenu();
        this.blur();
    });
    // Show help button only on desktop
    let helpButton = document.getElementById('help-button');
    if (isTouch()) {
        helpButton.style.display = 'none';
    }
    else {
        let helpButton = document.getElementById('help-button');
        helpButton.addEventListener('click', function () {
            toggleHelpMenu();
            this.blur();
        });
    }
    // Show inspect button only on mobile
    let inspectButton = document.getElementById('inspect-button');
    if (isTouch()) {
        inspectButton.addEventListener('click', function () {
            focusCanvas();
            toggleInspect();
            this.blur();
        });
    }
    else {
        inspectButton.style.display = 'none';
    }
}
export function toggleDrawMenu(toggle) {
    if (toggle) {
        focusCanvas();
        openMenu(MenuType.PLACE);
    }
    else if (toggle === undefined && existingMenuType !== MenuType.PLACE) {
        focusCanvas();
        openMenu(MenuType.PLACE);
    }
    else {
        closeCurrentMenu();
    }
}
export function toggleUtilityMenu(toggle) {
    if (toggle) {
        focusCanvas();
        openMenu(MenuType.UTILITY);
    }
    else if (toggle === undefined && existingMenuType !== MenuType.UTILITY) {
        focusCanvas();
        openMenu(MenuType.UTILITY);
    }
    else {
        closeCurrentMenu();
    }
}
// Close the current menu, putting focus onto the canvas
export function closeCurrentMenu() {
    existingMenu === null || existingMenu === void 0 ? void 0 : existingMenu.remove();
    existingMenuType = null;
}
