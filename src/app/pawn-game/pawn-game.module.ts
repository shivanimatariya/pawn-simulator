import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PawnGameRoutingModule } from './pawn-game-routing.module';
import { PawnGameComponent } from './pawn-game/pawn-game.component';
import { ChessSquareComponent } from './chess-square/chess-square.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PawnGameComponent, ChessSquareComponent],
  imports: [
    CommonModule,
    PawnGameRoutingModule,
    FormsModule
  ]
})
export class PawnGameModule { }
