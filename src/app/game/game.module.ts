import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';
import { FilterColPipe } from '../pipes/filter-col.pipe';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    GamePageRoutingModule
  ],
  declarations: [GamePage, FilterColPipe]
})
export class GamePageModule {}
