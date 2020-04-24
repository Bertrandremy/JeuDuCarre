
import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Square } from "../models/square";
import { Player } from "../models/player";
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})

export class GamePage implements OnInit {

  public squares: Array<Square>
  public player1: string;
  public player2: string;
  public playerTurn: boolean;
  public possibleMoves: number[];
  public niceMovesPhaseOne: number[];
  public paramGame: number[];
  public playerOne: Player;
  public playerTwo: Player;

  constructor(private _router: Router, private _gameService: GameService, private _data: DataService) {

    this._router = _router;
  }

  ngOnInit() {
    console.log("*****************************");
    console.log("*** Création de la partie ***");
    console.log("*****************************");
    this._data.currentParamGame.subscribe(paramGame => this.paramGame = paramGame);
    this.createGame();
    this.squares = this._gameService.loadSquare(4);
    this.playerTurn = true;
    this.possibleMoves = this._gameService.loadMoves(4);
    this.niceMovesPhaseOne = new Array;
    if (this.playerTurn) {
      this.newTurn(this.playerOne);
    } else {
      this.newTurn(this.playerTwo);
    }
  }

  /**
   * createGame
   */
  public createGame() {
    this.playerOne = this._gameService.createPlayer(this.paramGame[0]);
    this.playerTwo = this._gameService.createPlayer(this.paramGame[1]);
  }

  /**
   * newTurn
   */
  public newTurn(player: Player) {
    console.log("nbr de coup faisable = ", this.possibleMoves.length);

    if (player.type > 1 && this.possibleMoves.length > 0) {
      this.playTurn(player);
    }
  }

  /**
   * playTurn
   */
  public playTurn(player: Player) {
    let testThreeSides: number = this.checkThreeSides();
    if (testThreeSides != null) {
      this.clickCase(testThreeSides);
    } else {
      if (this.testEndPhaseOne()) {
        this.randomMove();
      } else {
        if (player.type > 2) {
          this.playMidDifficulty();
        } else {
          this.randomMove();
        }
      }
    }
  }

  /**
   * testEndPhaseOne
   */
  public testEndPhaseOne(): boolean {
    this.niceMovesPhaseOne.length = 0;
    let test: boolean = true;
    this.possibleMoves.forEach(move => {
      if (this.testTwoSides(move)) {
        this.niceMovesPhaseOne.push(move)
        test = false;
      }
    });
    return test;
  }

  /**
   * playMidleDifficulty
   */
  public playMidDifficulty() {
    let idNextMove = this.niceMovesPhaseOne[Math.floor(Math.random() * this.niceMovesPhaseOne.length)];
    setTimeout(() => {
      this.clickCase(idNextMove);
    }, 1000);
  }

  /**
   * randomMove
   */
  public randomMove(): void {
    let idNextMove = this.possibleMoves[Math.floor(Math.random() * this.possibleMoves.length)];
    setTimeout(() => {
      this.clickCase(idNextMove);
    }, 1000);
  }

  /**
   * checkThreeSides
   */
  public checkThreeSides(): number {
    let idSide: number = null;
    this.squares.forEach(square => {
      if (square.ctChecked == 3) {
        idSide = square.returnUncheck();
      }
    });
    return idSide;
  }

  /**
   * testMove
   */
  public testTwoSides(idNextMove: number): boolean {
    let test: boolean = true;
    this.findSquaresByCase(idNextMove).forEach(squareToTest => {
      if (squareToTest.ctChecked == 2) {
        test = false;
      }
    });
    return test;
  }

  clickCase(idCase: number): void {
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
    if (this.playerTurn) {
      this.newTurn(this.playerOne);
    } else {
      this.newTurn(this.playerTwo);
    }
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
        this.playerOne.score++;
        square.winningPlayer = 1;
      } else {
        this.playerTwo.score++;
        square.winningPlayer = 2;
      }
      return true;
    }
  }

  /**
   * clickBackHome
   */
  public clickBackHome() {
    this._router.navigate(['home']);

  }

}
