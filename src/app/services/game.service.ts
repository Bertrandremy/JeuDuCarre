import { Injectable } from '@angular/core';
import { Square } from '../models/square';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor() { }

  /**
   * loadSquare
   */
  public loadSquare(nPerSide: number): Array<Square> {
    let squares: Array<Square> = new Array;
    squares.push(new Square("A", 2, 3, 4, 1, 1));
    squares.push(new Square("B", 5, 6, 7, 3, 1));
    squares.push(new Square("C", 8, 9, 10, 6, 1));
    squares.push(new Square("D", 11, 12, 13, 9, 1));
    squares.push(new Square("E", 4, 15, 16, 14, 2));
    squares.push(new Square("F", 7, 17, 18, 15, 2));
    squares.push(new Square("G", 10, 19, 20, 17, 2));
    squares.push(new Square("H", 13, 21, 22, 19, 2));
    squares.push(new Square("I", 16, 24, 25, 23, 3));
    squares.push(new Square("J", 18, 26, 27, 24, 3));
    squares.push(new Square("K", 20, 28, 29, 26, 3));
    squares.push(new Square("L", 22, 30, 31, 28, 3));
    squares.push(new Square("M", 25, 33, 34, 32, 4));
    squares.push(new Square("N", 27, 35, 36, 33, 4));
    squares.push(new Square("O", 29, 37, 38, 35, 4));
    squares.push(new Square("P", 31, 39, 40, 37, 4));
    if (nPerSide > 4) {
      squares.push(new Square("Y", 41, 42, 43, 12, 1));
      squares.push(new Square("X", 43, 44, 45, 21, 2));
      squares.push(new Square("W", 45, 46, 47, 30, 3));
      squares.push(new Square("V", 47, 48, 49, 39, 4));
      squares.push(new Square("Q", 34, 58, 59, 60, 5));
      squares.push(new Square("R", 36, 56, 57, 58, 5));
      squares.push(new Square("S", 38, 54, 55, 56, 5));
      squares.push(new Square("T", 40, 52, 53, 54, 5));
      squares.push(new Square("U", 49, 50, 51, 52, 5));
    }
    if (nPerSide > 5) {
      squares.push(new Square("Z", 59, 63, 62, 61, 6));
      squares.push(new Square("AA", 57, 65, 64, 63, 6));
      squares.push(new Square("AB", 55, 67, 66, 65, 6));
      squares.push(new Square("AC", 53, 69, 68, 67, 6));
      squares.push(new Square("AD", 51, 71, 70, 69, 6));
      squares.push(new Square("AE", 74, 73, 72, 71, 6));
      squares.push(new Square("AF", 76, 75, 74, 50, 5));
      squares.push(new Square("AG", 78, 77, 76, 48, 4));
      squares.push(new Square("AH", 80, 79, 78, 46, 3));
      squares.push(new Square("AI", 82, 81, 80, 44, 2));
      squares.push(new Square("AJ", 84, 83, 82, 42, 1));

    }
    return squares;
  }

  public loadMoves(nPerSide: number): number[] {
    let listPossibleMoves: number[];
    listPossibleMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    if (nPerSide > 4) {
      listPossibleMoves.push(41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60);
    }
    if (nPerSide > 5) {
      listPossibleMoves.push(61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84);
    }
    return listPossibleMoves;
  }


  /**
   * createPlayer
   */
  public createPlayer(type: number): Player {
    let newPlayer: Player;
    switch (type) {
      case 1:
        newPlayer = new Player("Humain", type)
        break;
      case 2:
        newPlayer = new Player("IA Facile", type)
        break;
      case 3:
        newPlayer = new Player("IA Moyenne", type)
        break;
      case 4:
        newPlayer = new Player("IA Difficile", type)
        break;
      default:
        newPlayer = new Player("IA Moyenne", type)
        break;
    }
    console.log("Player créé", newPlayer);

    return newPlayer;
  }



}
