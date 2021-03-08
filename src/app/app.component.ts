import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  context: CanvasRenderingContext2D;
  canvasSize: number = 500;
  sectionSize = this.canvasSize / 3;
  board: any = [];
  lineColor: string = "#ddd";

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.drowBoard();
    this.drawLines(10, this.lineColor);
  }

  drowBoard() {
    this.canvas.nativeElement.width = this.canvasSize;
    this.canvas.nativeElement.height = this.canvasSize;
    this.context.translate(0.5, 0.5);
    for (var x = 0; x < 3; x++) {
      this.board.push([]);

      for (var y = 0; y < 3; y++) {
        this.board[x].push("");
      }
    }

    return this.board;
  }

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

  getAxies(event: MouseEvent) {
    console.log("mouse over");
    console.log("X ---", event.pageX);
    console.log("Y ---", event.pageY);


  }

}
