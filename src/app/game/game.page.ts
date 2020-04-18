
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
  public player1: string;
  public player2: string;
  public player1Score: number;
  public player2Score: number;
  public playerTurn: boolean;

  constructor(private gameService: GameService) {
    console.log("*****************************");
    console.log("*** Création de la partie ***");
    console.log("*****************************");
    this.player1 = "Joueur 1"
    this.player2 = "IA facile";
    this.player1Score = 0;
    this.player2Score = 0;
    this.squares = this.gameService.loadSquare(4);
    this.playerTurn = true;
  }

  ngOnInit() {
    // console.log("this.playerTurn", this.playerTurn);

  }

  clickCase(idCase: number) {
    let winTurn = false;
    console.log("Case cliquée ", idCase);
    this.squares.forEach(square => {
      if (this.checkCase(idCase, square)) {
        winTurn = true;
      }
    });
    if (!winTurn == true) {
      this.playerTurn = !this.playerTurn;
    }
  }

  /**
 * checkCase
//  */
  public checkCase(id: number, square: Square): boolean {
    switch (id) {
      case square.top:
        square.topChecked = true;
        square.ctChecked++;
        break;
      case square.right:
        square.rightChecked = true;
        square.ctChecked++;
        break;
      case square.left:
        square.leftChecked = true;
        square.ctChecked++;
        break;
      case square.down:
        square.downChecked = true;
        square.ctChecked++;
        break;
      default:
        return false;
    }
    if (square.ctChecked == 4) {
      if (this.playerTurn) {
        this.player1Score++;
        square.winningPlayer = 1;
      } else {
        this.player2Score++;
        square.winningPlayer = 2;
      }
      return true;
    }
  }

}
