enum MenuType {
    PLACE,
    ALTER,
    UTILITY
}

let existingMenu: HTMLDivElement | null = null;
let existingMenuType: MenuType | null = null;

function createMenu(menuType: MenuType) {
    let itemMenu = document.createElement('div');
    itemMenu.id = 'item-menu';

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
    }

    const buttonRect = button.getBoundingClientRect();
    itemMenu.style.left = `${buttonRect.left}px`;

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

}