import Base from '../core/Base';

export class Canvas extends Base {
  constructor(container, options) {
    super(options);

    this.container = container;

    const canvas = document.createElement('canvas');
    this.container.appendChild(canvas);
    canvas.setAttribute('id', 'indoorjs-canvas');

    canvas.width = this.width || this.container.clientWidth;
    canvas.height = this.height || this.container.clientHeight;

    this.canvas = new fabric.Canvas(canvas, {
      isDrawingMode: true,
      freeDrawingCursor: 'none',
      freeDrawingLineWidth: this.lineWidth
    });

    this.setLineWidth(this.lineWidth || 10);

    this.addCursor();
  }

  addCursor() {
    const canvas = this.canvas;
    const cursorCanvas = document.createElement('canvas');
    this.canvas.wrapperEl.appendChild(cursorCanvas);
    cursorCanvas.setAttribute('id', 'indoorjs-cursor-canvas');
    cursorCanvas.style.position = 'absolute';
    cursorCanvas.style.top = '0';
    cursorCanvas.style.pointerEvents = 'none';
    cursorCanvas.width = this.width || this.container.clientWidth;
    cursorCanvas.height = this.height || this.container.clientHeight;

    this.cursor = new fabric.StaticCanvas(cursorCanvas);
    const cursorOpacity = 0.5;
    const mousecursor = new fabric.Circle({
      left: -1000,
      top: -1000,
      radius: canvas.freeDrawingBrush.width / 2,
      fill: `rgba(255,0,0,${cursorOpacity})`,
      stroke: 'black',
      originX: 'center',
      originY: 'center'
    });

    this.cursor.add(mousecursor);
    this.mousecursor = mousecursor;

    canvas.on('mouse:move', evt => {
      const mouse = canvas.getPointer(evt.e);
      mousecursor
        .set({
          top: mouse.y,
          left: mouse.x
        })
        .setCoords()
        .canvas.renderAll();
    });

    canvas.on('mouse:out', () => {
      // put circle off screen
      mousecursor
        .set({
          left: -1000,
          top: -1000
        })
        .setCoords()
        .canvas.renderAll();
    });
  }

  setColor(color) {
    this.canvas.freeDrawingBrush.color = color;

    if (!this.mousecursor) return;

    this.mousecursor
      .set({
        left: 100,
        top: 100,
        fill: color
      })
      .setCoords()
      .canvas.renderAll();
  }

  setLineWidth(width) {
    this.lineWidth = width;
    this.canvas.freeDrawingBrush.width = width;

    if (!this.mousecursor) return;

    this.mousecursor
      .set({
        left: 100,
        top: 100,
        radius: width / 2
      })
      .setCoords()
      .canvas.renderAll();
  }

  clear() {
    this.canvas.clear();
  }
}

export const canvas = (container, options) => new Canvas(container, options);
