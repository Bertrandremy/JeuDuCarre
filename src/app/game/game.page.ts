
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
  public possibleMoves: number[];

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    console.log("*****************************");
    console.log("*** Création de la partie ***");
    console.log("*****************************");
    this.player1 = "Joueur 1"
    this.player2 = "IA facile";
    this.player1Score = 0;
    this.player2Score = 0;
    this.squares = this.gameService.loadSquare(4);
    this.playerTurn = true;
    this.possibleMoves = this.gameService.loadMoves(4);
    this.newTurn();
  }

  /**
   * newTurn
   */
  public newTurn() {
    console.log("Nouveau tour");
    console.log("coups possibles", this.possibleMoves);
    if (this.playerTurn && this.player1 == "IA facile") {
      this.playTurn();
    }
    if (!this.playerTurn && this.player2 == "IA facile") {
      this.playTurn();
    }
  }

  /**
   * playTurn
   */
  public playTurn() {
    let idNextMove = this.possibleMoves[Math.floor(Math.random() * this.possibleMoves.length)];
    console.log("L'IA pense à  ", idNextMove);
    console.log("Carrés qui contiennent cette case", this.findSquaresByCase(idNextMove));
    let test: boolean;
    let that = this;
    var promise = new Promise(function (resolve, reject) {
      that.findSquaresByCase(idNextMove).forEach(squareToTest => {
        console.log("Carré testé ", squareToTest);
        test = that.testTwoSides(idNextMove);
        console.log("test dans promise est ", test);
      });
      resolve();
    });
    promise.then(function (value) {
      console.log("promise", value);
      console.log("test après promise est ", test);
      if (test) {
        setTimeout(() => {

          that.clickCase(idNextMove);
        }, 1000);
      } else {
        console.log("nouvel essai");
        
        that.playTurn();
      }

    });



  }

  /**
   * testMove
   */
  public testTwoSides(idNextMove: number): boolean {
    let test: boolean = true;
    this.findSquaresByCase(idNextMove).forEach(squareToTest => {
      console.log("Carré testé ", squareToTest);
      if (squareToTest.ctChecked == 2) {
        console.log("Un carré à déjà 2 côtés cochés");
        test = false;
      }
    });
    return test;
  }

  clickCase(idCase: number): void {
    console.log("Case cliquée ", idCase);
    let winTurn = false;
    this.squares.forEach(square => {
      if (this.checkCase(idCase, square)) {
        winTurn = true;
      }
    });
    if (!winTurn == true) {
      this.playerTurn = !this.playerTurn;
    }
    // let pos = this.possibleMoves.indexOf(idCase);
    this.possibleMoves.splice(this.possibleMoves.indexOf(idCase), 1);
    this.newTurn();
  }

  /**
   * findSquaresByCase
   */
  public findSquaresByCase(idCase: number): Square[] {
    let squaresToReturn: Array<Square> = new Array;
    this.squares.forEach(square => {
      switch (idCase) {
        case square.top:
          squaresToReturn.push(square);
          break;
        case square.right:
          squaresToReturn.push(square);
          break;
        case square.down:
          squaresToReturn.push(square);
          break;
        case square.left:
          squaresToReturn.push(square);
          break;
      }
    });
    return squaresToReturn;
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
