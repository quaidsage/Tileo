var MenuType;
(function (MenuType) {
    MenuType[MenuType["PLACE"] = 0] = "PLACE";
    MenuType[MenuType["ALTER"] = 1] = "ALTER";
    MenuType[MenuType["UTILITY"] = 2] = "UTILITY";
})(MenuType || (MenuType = {}));
let existingMenu = null;
let existingMenuType = null;
function createMenu(menuType) {
    let itemMenu = document.createElement('div');
    itemMenu.id = 'item-menu';
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
    }
    const buttonRect = button.getBoundingClientRect();
    itemMenu.style.left = `${buttonRect.left}px`;
    document.body.appendChild(itemMenu);
    return itemMenu;
}
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
}
