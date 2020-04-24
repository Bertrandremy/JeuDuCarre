import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private paramGameSource = new BehaviorSubject([1, 1, 4]);
  currentParamGame = this.paramGameSource.asObservable();

  constructor() { }

  changeMessage(paramGame: number[]) {
    console.log("changeMessage");
    
    this.paramGameSource.next(paramGame)
  }
}
