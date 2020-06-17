import { Injectable } from '@angular/core';
import { Square } from '../models/square';

@Injectable({
  providedIn: 'root'
})
export class SquareService {

  constructor() { }

  /**
   * findSquareById
   */
  public findSquareById(idSquare: string, listSquare: Square[]): Square {
    let squareToReturn = listSquare.find(square => square.id == idSquare);
    return squareToReturn;
  }

  /**
   * findSquaresByCase
   */
  public findSquaresByCase(idCase: number, listSquare: Square[]): Square[] {
    let squaresToReturn: Array<Square> = new Array;
    listSquare.forEach(square => {
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
}

