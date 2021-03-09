import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  context: CanvasRenderingContext2D;
  canvasSize: number = 500;
  sectionSize = this.canvasSize / 3;
  board: any = [];
  canvas: any;
  player: number = 0;

  constructor() { }

  /**
   * Initialize the canvas width & hight
   * @param canvas canavas instance element ref
   */
  drowBoard(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.nativeElement.getContext('2d');

    canvas.nativeElement.width = this.canvasSize;
    canvas.nativeElement.height = this.canvasSize;

    // this.context.translate(0.5, 0.5);
    // for (var x = 0; x < 3; x++) {
    //   this.board.push([]);
    //   console.log('this.board', this.board);
    //   for (var y = 0; y < 3; y++) {
    //     this.board[x].push("");
    //   }
    // }
  }

  /**
   * Drow the horizontal & vertical lines on board
   * 
   * @param lineWidth line og width
   * @param strokeStyle color name
   */
  drawLines(lineWidth, strokeStyle) {
    var lineStart = 4;
    var lineLenght = this.canvasSize - 5;
    this.context.lineWidth = lineWidth;
    this.context.lineCap = 'round';
    this.context.strokeStyle = strokeStyle;
    this.context.beginPath();

    /*
     * Horizontal lines 
     */
    for (var y = 1; y <= 2; y++) {
      this.context.moveTo(lineStart, y * this.sectionSize);
      this.context.lineTo(lineLenght, y * this.sectionSize);
    }

    /*
     * Vertical lines 
     */
    for (var x = 1; x <= 2; x++) {
      this.context.moveTo(x * this.sectionSize, lineStart);
      this.context.lineTo(x * this.sectionSize, lineLenght);
    }

    this.context.stroke();
  }

  /**
   * Get the mouse click position
   * 
   * @param event mouse event
   */
  getCanvasMousePosition(event) {
    if (this.player === 1) {
      this.player = 2;
    } else {
      this.player = 1;
    }

    var rect = this.canvas.nativeElement.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }

  /**
   * Reset the board
   * 
   * @param xCordinate 
   * @param yCordinate 
   */
  clearPlayingArea(xCordinate, yCordinate) {
    this.context.fillStyle = "#fff";
    this.context.fillRect(xCordinate, yCordinate, this.sectionSize, this.sectionSize);
  }

  /**
   * Check the player and apply the tic tok canvas e.g X 0
   * 
   * @param mouse 
   */
  addPlayingPiece(mouse) {
    var xCordinate;
    var yCordinate;

    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        xCordinate = x * this.sectionSize;
        yCordinate = y * this.sectionSize;

        if (
          mouse.x >= xCordinate &&
          mouse.x <= xCordinate + this.sectionSize &&
          mouse.y >= yCordinate &&
          mouse.y <= yCordinate + this.sectionSize
        ) {
          this.clearPlayingArea(xCordinate, yCordinate);

          if (this.player === 1) {
            this.drawX(xCordinate, yCordinate);
          } else {
            this.drawO(xCordinate, yCordinate);
          }
        }
      }
    }
  }

  /**
   * Draw the X on canvas screen
   * 
   * @param xCordinate 
   * @param yCordinate 
   */
  drawX(xCordinate, yCordinate) {
    this.context.strokeStyle = "#f1be32";

    this.context.beginPath();

    var offset = 50;
    this.context.moveTo(xCordinate + offset, yCordinate + offset);
    this.context.lineTo(
      xCordinate + this.sectionSize - offset,
      yCordinate + this.sectionSize - offset
    );

    this.context.moveTo(xCordinate + offset, yCordinate + this.sectionSize - offset);
    this.context.lineTo(xCordinate + this.sectionSize - offset, yCordinate + offset);

    this.context.stroke();
  }

  /**
   * Draw the 0 on canvas element by mouse click
   * 
   * @param xCordinate 
   * @param yCordinate 
   */
  drawO(xCordinate, yCordinate) {
    var halfSectionSize = 0.5 * this.sectionSize;
    var centerX = xCordinate + halfSectionSize;
    var centerY = yCordinate + halfSectionSize;
    var radius = (this.sectionSize - 100) / 2;
    var startAngle = 0 * Math.PI;
    var endAngle = 2 * Math.PI;

    this.context.lineWidth = 10;
    this.context.strokeStyle = "#01bBC2";
    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, startAngle, endAngle);
    this.context.stroke();
  }




}
