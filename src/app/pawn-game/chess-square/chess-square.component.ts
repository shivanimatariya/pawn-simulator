import { Component, Input, OnInit } from '@angular/core';
import { Pawn } from '../common/interface';
import { PawnService } from '../common/pawn.service';

@Component({
  selector: 'app-chess-square',
  templateUrl: './chess-square.component.html',
  styleUrls: ['./chess-square.component.scss'],
})
export class ChessSquareComponent implements OnInit {
  @Input() x;
  @Input() y;
  isActive = false;
  _pawn: Pawn;
  get pawn(): Pawn {
      return this._pawn;
  }
  @Input() set pawn(value: Pawn) {
    this._pawn = value;
    if (value && value.x === this.x && value.y === this.y) {
      this.isActive = true;
    }
  }
  constructor(private service: PawnService) { }

  ngOnInit() {
    this.x = Math.abs(this.x);
    this.service.getUpdatedPosition().subscribe(value => {
      if (value && value.x === this.x && value.y === this.y) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    });
  }

}
