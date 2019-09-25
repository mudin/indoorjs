import { Modes } from '../core/Constants';

const ModesMixin = superclass => class extends superclass {
  /**
     * MODES
     */
  setMode(mode) {
    this.mode = mode;

    switch (mode) {
      case Modes.SELECT:
        this.canvas.isDrawingMode = false;
        this.canvas.interactive = true;
        this.canvas.selection = true;
        this.canvas.hoverCursor = 'default';
        this.canvas.moveCursor = 'default';
        break;
      case Modes.GRAB:
        this.canvas.isDrawingMode = false;
        this.canvas.interactive = false;
        this.canvas.selection = false;
        this.canvas.discardActiveObject();
        this.canvas.hoverCursor = 'move';
        this.canvas.moveCursor = 'move';
        break;
      case Modes.DRAW:
        this.canvas.isDrawingMode = true;
        break;

      default:
        break;
    }
  }

  setModeAsDraw() {
    this.setMode(Modes.DRAW);
  }

  setModeAsSelect() {
    this.setMode(Modes.SELECT);
  }

  setModeAsGrab() {
    this.setMode(Modes.GRAB);
  }

  isSelectMode() {
    return this.mode === Modes.SELECT;
  }

  isGrabMode() {
    return this.mode === Modes.GRAB;
  }

  isDrawMode() {
    return this.mode === Modes.DRAW;
  }
};

export default ModesMixin;
