import { Injectable } from '@angular/core';
import { Square } from '../models/square';

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
    if (nPerSide == 5) {
    }
    return squares;
  }

  public loadMoves(nPerSide: number): number[] {
    let listPossibleMoves: number[];
    switch (nPerSide) {
      case 4:
        listPossibleMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
        break;
      case 5:
        listPossibleMoves.push(41, 42, 43, 44, 45)
        break;
      default:
        break;
    }
    return listPossibleMoves;
  }



}
