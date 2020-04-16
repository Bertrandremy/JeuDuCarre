
import { Component, OnInit } from '@angular/core';
import { Square } from "../models/square";
import { GameService } from '../services/game.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})

export class GamePage implements OnInit {

  public squares: Array<Square>

  constructor(private gameService: GameService) {
    console.log("*****************************");
    console.log("*** Création de la partie ***");
    console.log("*****************************");
  }

  ngOnInit() {
    this.squares = this.gameService.loadSquare(4);
    console.log("carrés chargés:");
    console.log(this.squares);
  }

  clickCase(idCase: number) {
    console.log("Case cliquée ", idCase);
    this.squares.forEach(square => {
      square.checkCase(idCase);
    });
  }

}
