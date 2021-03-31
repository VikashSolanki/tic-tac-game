import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  maxBoradBox: number = 9;
  boards: Array<{ id: number }> = [];
  element: any = {};
  player: any = true;
  dies: string = '';

  constructor() { }

  ngOnInit() {
    for (let index = 0; index < this.maxBoradBox; index++) {
      this.boards.push({ id: index });
    }
    // console.log(this.player);
    console.log(9 / 4 % 1);
    console.log(9 / 4);

    // console.log(8 % 1);
    // console.log(8 % 2);
    // console.log(8 % 3);
    // console.log(8 % 4);



  }

  onCheckBoxChange(event) {
    if (event.target.checked) {
      (this.player) ? event.srcElement.classList.add("p1") : event.srcElement.classList.add("p2");
    }
    event.srcElement.disabled = true;
    this.player = !this.player;
  }

}
