export class Circle extends fabric.Circle {
  constructor(options) {
    super(options);
    console.log('circle');
  }
}

export const circle = (options) => new Circle(options);
