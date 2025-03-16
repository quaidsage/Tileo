import { Sand, Water, Fire, Smoke, Wood, Stone, Custom, Empty } from './elements/ElementIndex.js';
import { setCurrentElement, toggleInspect } from './controls.js';
import { togglePause } from './config.js';
var MenuType;
(function (MenuType) {
    MenuType[MenuType["PLACE"] = 0] = "PLACE";
    MenuType[MenuType["ALTER"] = 1] = "ALTER";
    MenuType[MenuType["UTILITY"] = 2] = "UTILITY";
    MenuType[MenuType["INSPECT"] = 3] = "INSPECT";
})(MenuType || (MenuType = {}));
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
let placeItems = ['Sand', 'Wood', 'Water', 'Smoke', 'Stone', 'Fire', 'Custom', 'Eraser', 'Temp'];
let alterItems = ['Plus Brush', 'Minus Brush'];
let utilityItems = ['Save', 'Load', 'Pause', 'Clear'];
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
                });
                item.className = 'menu-item';
                itemMenu.appendChild(item);
            });
            break;
        case MenuType.ALTER:
            alterItems.forEach(element => {
                item = document.createElement('button');
                item.textContent = element;
                item.addEventListener('click', function () {
                    toggleInspect(false);
                    console.log(`Altering with ${element}`);
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
                    if (element === 'Pause') {
                        togglePause();
                    }
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
        case MenuType.ALTER:
            button = document.getElementById('alter-button');
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
        case MenuType.ALTER:
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
        openMenu(MenuType.PLACE);
    });
    let alterButton = document.getElementById('alter-button');
    alterButton.addEventListener('click', function () {
        openMenu(MenuType.ALTER);
    });
    let utilityButton = document.getElementById('utility-button');
    utilityButton.addEventListener('click', function () {
        openMenu(MenuType.UTILITY);
    });
    let inspectButton = document.getElementById('inspect-button');
    inspectButton.addEventListener('click', function () {
        toggleInspect();
        closeCurrentMenu();
    });
}
// Close the current menu, putting focus onto the canvas
export function closeCurrentMenu() {
    existingMenu === null || existingMenu === void 0 ? void 0 : existingMenu.remove();
    existingMenuType = null;
}
