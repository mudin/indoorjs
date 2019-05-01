import Grid from "../helpers/Grid";

class Map {
  constructor(container, options) {
    options.container = container;
    return new Grid(options);
  }
}

export default Map;