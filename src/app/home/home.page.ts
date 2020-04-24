import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { FormsModule, NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  playersForm: FormGroup;
  public playerOneByDefault: string;
  public playerTwoByDefault: string;
  public numberCasesDefault: string;
  private _router: Router;
  public paramGame: number[];

  constructor(_router: Router, public fb: FormBuilder, private _data: DataService) {

    this._router = _router;
    this.playerOneByDefault = "1";
    this.playerTwoByDefault = "1";
    this.numberCasesDefault = "4";
    this.playersForm = this.fb.group({
      playerOne: [1, [Validators.required]],
      playerTwo: [1, [Validators.required]],
      numberCases: [4, [Validators.required]]
    });
  }

  ngOnInit() {
    this._data.currentParamGame.subscribe(paramGame => this.paramGame = paramGame)
  }

  /**
   * createGame
   */
  public createGame() {
    let player1: number = +this.playersForm.value.playerOne;
    let player2: number = +this.playersForm.value.playerTwo;
    let nbCases: number = +this.playersForm.value.numberCases;
    this._data.changeMessage([player1, player2, nbCases])
    this._router.navigate(['game']);

  }
}
