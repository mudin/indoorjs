import Base from "./Base";
import { ICON } from "../Constants";

class Icon extends Base {
  constructor(options) {
    super(options);
    this.defaults = Object.assign({}, ICON);
    Object.assign({}, this.defaults);
    Object.assign({}, this.options);
  }
}
export default Icon;