export class Group extends fabric.Group {
  constructor(objects, options) {
    options = options || {};
    super(objects, options);
  }
}

export const group = (objects, options) => new Group(objects, options);

export default Group;
