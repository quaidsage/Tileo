import Grid from "../grid.js";
import Element from "../elements/element.js";

class Behaviour {
    update(grid: Grid, element: Element) { }

    clone(): Behaviour {
        return new Behaviour();
    }
}
export default Behaviour;