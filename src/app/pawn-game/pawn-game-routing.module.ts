import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PawnGameComponent } from './pawn-game/pawn-game.component';

const routes: Routes = [
  { path: '', component: PawnGameComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PawnGameRoutingModule { }
