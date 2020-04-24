import { Injectable } from '@angular/core';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

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
