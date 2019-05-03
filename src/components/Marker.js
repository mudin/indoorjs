import Layer from "./Layer";

class Marker extends Layer {
  constructor(position, options) {
    options.position = position;
    super(options);
  }
}
export default Marker;