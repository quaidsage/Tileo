export function randomColor(color) {
    let randomDarkness = Math.random() * (0.9 - 0.8) + 0.8;
    return color.map(c => c * ((Math.random() * (1 - 0.85) + 0.85)) * randomDarkness);
}

export function parseColor(color) {
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
    return [r, g, b];
}

export function rgbToHex(colors) {
    console.log(colors);
    return "#" + ((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).slice(1);
}

