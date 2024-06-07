export function randomColor(color) {
    let randomDarkness = Math.random() * (0.9-0.8) + 0.8;
    return color.map(c => c * ((Math.random() * (1-0.85) + 0.85)) * randomDarkness);
}

