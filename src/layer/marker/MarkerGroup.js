import { Group } from '../Group';

export class MarkerGroup extends Group {
  constructor(options) {
    options = options || {};
    super(options);
  }
}
export const markerGroup = (options) => new MarkerGroup(options);
