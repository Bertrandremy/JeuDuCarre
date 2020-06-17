
import { Component, OnInit } from '@angular/core';
import { Square } from "../models/square";
import { Player } from "../models/player";
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { GameService } from '../services/game.service';
import { SquareService } from '../services/square.service';

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

  constructor(private _router: Router, private _gameService: GameService, private _dataService: DataService, private _squareService: SquareService) {

    this._router = _router;
  }

  ngOnInit() {
    console.log("*****************************");
    console.log("*** Création de la partie ***");
    console.log("*****************************");
    this._dataService.currentParamGame.subscribe(paramGame => this.paramGame = paramGame);
    this.createGame();
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
    this.squares = this._gameService.loadSquare(this.paramGame[2]);
    this.possibleMoves = this._gameService.loadMoves(this.paramGame[2]);
    console.log("this.squares", this.squares);
    console.log("this.possibleMoves", this.possibleMoves);


    this.playerTurn = true;
    this.niceMovesPhaseOne = new Array;
    this.testHardDiff();
  }

  /**
   * newTurn
   */
  public newTurn(player: Player) {
    if (player.type > 1 && this.possibleMoves.length > 0) {
      this.playTurn(player);
    }
  }

  /**
   * playTurn
   */
  public playTurn(player: Player) {
    let testThreeSides: number = this.checkThreeSides(this.squares);
    if (testThreeSides != null) {
      this.clickCase(testThreeSides);
    } else {
      if (player.type == 2) {
        this.randomMove();
      }
      if (player.type == 3) {
        if (this.testEndPhaseOne()) {
          this.randomMove();
        } else {
          this.playMidDifficulty();
        }
      }
      if (player.type == 4) {
        if (this.testEndPhaseOne()) {
          this.playHardDifficulty();
        } else {
          // this.playMidDifficulty();
        }
      }
    }
  }

  public playHardDifficulty() {
    console.log("playHardDifficulty");

    let simulationSquares: Square[];
    // Boucle sur chaque coup possible
    this.possibleMoves.forEach(move => {
      console.log("****** Test de ", move);
      simulationSquares = JSON.parse(JSON.stringify(this.squares));
      let pointScored = 0;
      pointScored = this.countPointsGoingToBeEarn(move, simulationSquares, pointScored);
      // console.log("Après la simulation, il faut cocher les cases ", this.checkThreeSides(simulationSquares));
      // On vérifie si après avoir validé le/les premiers carrés, il iy en a d autres


      while (this.checkThreeSides(simulationSquares)) {
        console.log("Il y a un carré à faire, on relance donc la fonction recursive");
        let newCaseToTest = this.checkThreeSides(simulationSquares);
        console.log("Il faut tester avec la case ", newCaseToTest);

        pointScored = this.countPointsGoingToBeEarn(newCaseToTest, simulationSquares, pointScored);
        if (this.checkThreeSides(simulationSquares)) {
          console.log("Après la deuxième boucle de la fonction, il reste la case ", this.checkThreeSides(simulationSquares), " a cocher");

        }

      }

      console.log("++++++ Le move ", move, " permet de marquer ", pointScored, " points");

    });
  }

  /**
   * Count the squares that are going to be made
   */
  public countPointsGoingToBeEarn(move: number, simulationSquares: Square[], pointScored: number): number {
    let pointToReturn = pointScored;
    let pointScoreChanged = false;

    // On boucle sur tous les carré pour tester un checkCase
    for (let index = 0; index < simulationSquares.length; index++) {

      let square = simulationSquares[index];
      this.checkCase(move, square, true);
      let SquareDone = this.checkCase(move, square, true);
      if (SquareDone !== null) {
        console.log("Le carré fait est ", SquareDone);
        console.log("case à cocher pour finir un carré ==", this.returnUncheck(this._squareService.findSquareById(SquareDone, simulationSquares)));
        simulationSquares.forEach(square => {
          this.checkCase(this.returnUncheck(this._squareService.findSquareById(SquareDone, simulationSquares)), square, true) !== null;
        });
        pointScoreChanged = true;
        pointToReturn++;
      }
    }
    return pointToReturn;
  }


  /**
   * testEndPhaseOne
   */
  public testEndPhaseOne(): boolean {
    this.niceMovesPhaseOne.length = 0;
    let test: boolean = true;
    console.log("this.possibleMoves", this.possibleMoves);

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
  public checkThreeSides(squares: Square[]): number {
    let idSide: number = null;
    for (let index = 0; index < squares.length; index++) {
      let square = squares[index];
      if (square.ctChecked == 3) {
        idSide = this.returnUncheck(square);
      }
    }
    // squares.forEach(square => {

    // });
    return idSide;
  }

  /**
   * returnUncheck
   */
  public returnUncheck(square): number {
    switch (false) {
      case square.topChecked:
        return square.top
      case square.rightChecked:
        return square.right
      case square.leftChecked:
        return square.left
      case square.downChecked:
        return square.down
      default:
        return null;
    }
  }

  /**
   * testMove
   */
  public testTwoSides(idNextMove: number): boolean {
    let test: boolean = true;
    this._squareService.findSquaresByCase(idNextMove, this.squares).forEach(squareToTest => {
      if (squareToTest.ctChecked == 2) {
        test = false;
      }
    });
    return test;
  }

  clickCase(idCase: number): void {
    let winTurn = false;
    this.squares.forEach(square => {
      if (this.checkCase(idCase, square, false) !== null) {
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
 * checkCase
//  */
  public checkCase(id: number, square: Square, simulation: boolean): string {
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
        break;
    }
    if (square.ctChecked == 4) {
      if (!simulation) {
        if (this.playerTurn) {
          this.playerOne.score++;
          square.winningPlayer = 1;
        } else {
          this.playerTwo.score++;
          square.winningPlayer = 2;
        }
      }
      // console.log("square testé dans checkcase ", square);

      square.ctChecked = 0;
      return square.id;
    } else {
      return null;
    }
  }

  /**
   * clickBackHome
   */
  public clickBackHome() {
    this._router.navigate(['home']);

  }

  /**
   * testHardDiff
   */
  public testHardDiff() {
    this.clickCase(1);
    this.clickCase(3);
    this.clickCase(15);
    this.clickCase(16);
    this.clickCase(6);
    this.clickCase(17);
    this.clickCase(26);
    this.clickCase(35);
    this.clickCase(27);
    this.clickCase(25);
    this.clickCase(32);
    this.clickCase(10);
    this.clickCase(11);
    this.clickCase(12);
    this.clickCase(28);
    this.clickCase(31);
    this.clickCase(37);
  }

}
