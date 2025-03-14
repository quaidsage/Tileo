import { Sand, Water, Fire, Smoke, Wood, Stone, Custom, Empty } from './elements/ElementIndex.js';
import { setCurrentElement, toggleInspect } from './controls.js';

enum MenuType {
    PLACE,
    ALTER,
    UTILITY,
    INSPECT
}

const controls: { [key: string]: () => any } = {
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
let alterItems = ['Plus Brush', 'Minus Brush'];
let utilityItems = ['Save', 'Load'];

let existingMenu: HTMLDivElement | null | undefined = null;
let existingMenuType: MenuType | null = null;

function addItems(itemMenu: HTMLDivElement, menuType: MenuType) {
    let item: HTMLButtonElement;

    switch (menuType) {
        case MenuType.PLACE:
            placeItems.forEach(element => {
                item = document.createElement('button');
                item.textContent = element;
                item.addEventListener('click', function () {
                    toggleInspect(false);
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
                    console.log(`Using utility ${element}`);
                });
                item.className = 'menu-item';
                itemMenu.appendChild(item);
            });
            break;
    }
}

function positionMenu(itemMenu: HTMLDivElement, menuType: MenuType) {
    // Update y position of menu based on toolbar position
    itemMenu.style.top = `${(document.getElementById('toolbar') as HTMLDivElement).getBoundingClientRect().top + 5}px`;
    itemMenu.style.transform = `translateY(-100%)`;

    let button: HTMLButtonElement;
    switch (menuType) {
        case MenuType.PLACE:
            button = document.getElementById('place-button') as HTMLButtonElement;
            break;
        case MenuType.ALTER:
            button = document.getElementById('alter-button') as HTMLButtonElement;
            break;
        case MenuType.UTILITY:
            button = document.getElementById('utility-button') as HTMLButtonElement;
            break;
        default:
            return;
    }

    const buttonRect = button.getBoundingClientRect();
    itemMenu.style.left = `${buttonRect.left}px`;
}

function createMenu(menuType: MenuType) {
    let itemMenu = document.createElement('div');
    itemMenu.id = 'item-menu';

    positionMenu(itemMenu, menuType);

    addItems(itemMenu, menuType);

    document.body.appendChild(itemMenu);
    return itemMenu;
}

function openMenu(menuType: MenuType) {
    if (existingMenuType === menuType) {
        existingMenu?.remove();
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

export function setupToolbar() {
    // Bind functions to pressing of toolbar buttons
    let placeButton = document.getElementById('place-button') as HTMLButtonElement;
    placeButton.addEventListener('click', function () {
        openMenu(MenuType.PLACE);
    });

    let alterButton = document.getElementById('alter-button') as HTMLButtonElement;
    alterButton.addEventListener('click', function () {
        openMenu(MenuType.ALTER);
    });

    let utilityButton = document.getElementById('utility-button') as HTMLButtonElement;
    utilityButton.addEventListener('click', function () {
        openMenu(MenuType.UTILITY);
    });

    let inspectButton = document.getElementById('inspect-button') as HTMLButtonElement;
    inspectButton.addEventListener('click', function () {
        toggleInspect();
    });
}

export function closeCurrentMenu() {
    existingMenu?.remove();
    existingMenuType = null;
}