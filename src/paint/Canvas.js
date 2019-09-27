/* eslint-disable no-unused-vars */
import Base from '../core/Base';
import { Arrow } from './Arrow';

const Modes = {
  SELECT: 'select',
  DRAWING: 'drawing',
  ARROW: 'arrow',
  TEXT: 'text'
};

export class Canvas extends Base {
  constructor(container, options) {
    super(options);

    this.container = container;

    const canvas = document.createElement('canvas');
    this.container.appendChild(canvas);
    canvas.setAttribute('id', 'indoorjs-canvas');

    canvas.width = this.width || this.container.clientWidth;
    canvas.height = this.height || this.container.clientHeight;

    this.currentColor = this.currentColor || 'black';
    this.fontFamily = this.fontFamily || 'Roboto';

    this.canvas = new fabric.Canvas(canvas, {
      freeDrawingCursor: 'none',
      freeDrawingLineWidth: this.lineWidth
    });
    this.arrows = [];

    this.setLineWidth(this.lineWidth || 10);
    this.addCursor();
    this.addListeners();

    this.setModeAsArrow();
  }

  setModeAsDrawing() {
    this.mode = Modes.DRAWING;
    this.canvas.isDrawingMode = true;
    this.canvas.selection = false;
    this.onModeChanged();
  }

  isDrawingMode() {
    return this.mode === Modes.DRAWING;
  }

  setModeAsSelect() {
    this.mode = Modes.SELECT;
    this.canvas.isDrawingMode = false;
    this.canvas.selection = true;
    this.onModeChanged();
  }

  isSelectMode() {
    return this.mode === Modes.SELECT;
  }

  setModeAsArrow() {
    this.mode = Modes.ARROW;
    this.canvas.isDrawingMode = false;
    this.canvas.selection = false;
    this.onModeChanged();
  }

  isArrowMode() {
    return this.mode === Modes.ARROW;
  }

  setModeAsText() {
    this.mode = Modes.TEXT;
    this.canvas.isDrawingMode = false;
    this.canvas.selection = false;
    this.onModeChanged();
  }

  isTextMode() {
    return this.mode === Modes.TEXT;
  }

  onModeChanged() {
    this.updateCursor();
    this.emit('mode-changed', this.mode);
    this.canvas._objects.forEach(obj => {
      obj.evented = this.isSelectMode();
    });
  }

  addListeners() {
    const canvas = this.canvas;
    canvas.on('mouse:move', evt => {
      const mouse = canvas.getPointer(evt.e);
      if (this.mousecursor) {
        this.mousecursor
          .set({
            top: mouse.y,
            left: mouse.x
          })
          .setCoords()
          .canvas.renderAll();
      }

      if (this.isTextMode()) {
        console.log('text');
      } else if (this.isArrowMode()) {
        if (this.activeArrow) {
          this.activeArrow.addTempPoint(mouse);
        }
        this.canvas.requestRenderAll();
      }
    });

    canvas.on('mouse:out', () => {
      // put circle off screen
      if (!this.mousecursor) return;
      this.mousecursor
        .set({
          left: -1000,
          top: -1000
        })
        .setCoords();

      this.cursor.renderAll();
    });

    canvas.on('mouse:up', event => {
      if (canvas.mouseDown) {
        canvas.fire('mouse:click', event);
      }
      canvas.mouseDown = false;
    });

    canvas.on('mouse:move', event => {
      canvas.mouseDown = false;
    });

    canvas.on('mouse:down', event => {
      canvas.mouseDown = true;
    });

    canvas.on('mouse:click', event => {
      console.log('mouse click', event);
      const mouse = canvas.getPointer(event.e);
      if (event.target) return;
      if (this.isTextMode()) {
        const text = new fabric.IText('Text', {
          left: mouse.x,
          top: mouse.y,
          width: 100,
          fontSize: 20,
          fontFamily: this.fontFamily,
          lockUniScaling: true,
          fill: this.currentColor,
          stroke: this.currentColor
        });
        canvas
          .add(text)
          .setActiveObject(text)
          .renderAll();

        this.setModeAsSelect();
      } else if (this.isArrowMode()) {
        console.log('arrow mode');
        if (this.activeArrow) {
          this.activeArrow.addPoint(mouse);
        } else {
          this.activeArrow = new Arrow(mouse, {
            stroke: this.currentColor,
            strokeWidth: this.lineWidth
          });
          this.canvas.add(this.activeArrow);
        }
        this.canvas.requestRenderAll();
      }
    });

    canvas.on('mouse:dblclick', event => {
      console.log('mouse:dbclick');
      if (this.isArrowMode() && this.activeArrow) {
        this.arrows.push(this.activeArrow);
        this.activeArrow = null;
      }
    });

    canvas.on('selection:created', event => {
      this.emit('selected');
    });

    canvas.on('selection:cleared', event => {
      this.emit('unselected');
    });
  }

  removeSelected() {
    this.canvas.remove(this.canvas.getActiveObject());
    this.canvas.getActiveObjects().forEach(obj => {
      this.canvas.remove(obj);
    });
    this.canvas.discardActiveObject().renderAll();
  }

  updateCursor() {
    if (!this.cursor) return;

    const canvas = this.canvas;

    if (this.mousecursor) {
      this.cursor.remove(this.mousecursor);
      this.mousecursor = null;
    }

    const cursorOpacity = 0.3;
    let mousecursor = null;
    if (this.isDrawingMode()) {
      mousecursor = new fabric.Circle({
        left: -1000,
        top: -1000,
        radius: canvas.freeDrawingBrush.width / 2,
        fill: `rgba(255,0,0,${cursorOpacity})`,
        stroke: 'black',
        originX: 'center',
        originY: 'center'
      });
    } else if (this.isTextMode()) {
      mousecursor = new fabric.Path('M0,-10 V10', {
        left: -1000,
        top: -1000,
        radius: canvas.freeDrawingBrush.width / 2,
        fill: `rgba(255,0,0,${cursorOpacity})`,
        stroke: `rgba(0,0,0,${cursorOpacity})`,
        originX: 'center',
        originY: 'center',
        scaleX: 1,
        scaleY: 1
      });
    } else {
      mousecursor = new fabric.Path('M0,-10 V10 M-10,0 H10', {
        left: -1000,
        top: -1000,
        radius: canvas.freeDrawingBrush.width / 2,
        fill: `rgba(255,0,0,${cursorOpacity})`,
        stroke: `rgba(0,0,0,${cursorOpacity})`,
        originX: 'center',
        originY: 'center'
      });
    }

    if (this.isSelectMode()) {
      mousecursor = null;
      this.canvas.defaultCursor = 'default';
    } else {
      this.canvas.defaultCursor = 'none';
    }
    if (mousecursor) {
      this.cursor.add(mousecursor);
    }
    this.mousecursor = mousecursor;
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
    this.cursorCanvas = cursorCanvas;
    canvas.defaultCursor = 'none';
    this.cursor = new fabric.StaticCanvas(cursorCanvas);
    this.updateCursor();
  }

  setColor(color) {
    this.currentColor = color;
    this.canvas.freeDrawingBrush.color = color;

    const obj = this.canvas.getActiveObject();
    if (obj) {
      obj.set('stroke', color);
      obj.set('fill', color);
      this.canvas.requestRenderAll();
    }

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

  setFontFamily(family) {
    this.fontFamily = family;
    const obj = this.canvas.getActiveObject();
    if (obj && obj.type === 'i-text') {
      obj.set('fontFamily', family);
      this.canvas.requestRenderAll();
    }
  }

  clear() {
    this.arrows = [];
    this.canvas.clear();
  }
}

export const canvas = (container, options) => new Canvas(container, options);
