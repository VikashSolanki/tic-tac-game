import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  lineColor: string = "#ddd";

  constructor(private gameService: GameService) {
  }

  ngAfterViewInit() {
    this.gameService.drowBoard(this.canvas);
    this.gameService.drawLines(10, this.lineColor);
  }

  /**
   * Handle the mouse click event
   * 
   * @param event 
   */
  @HostListener('document:mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    var canvasMousePosition = this.gameService.getCanvasMousePosition(event);
    this.gameService.addPlayingPiece(canvasMousePosition);
    this.gameService.drawLines(10, this.lineColor);
  }

}
