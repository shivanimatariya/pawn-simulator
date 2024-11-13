import { Component, OnInit } from '@angular/core';
import { Directions, getColorFromVal, getDirectionFromVal, PawnColors } from '../common/constant';
import { Pawn } from '../common/interface';
import { PawnService } from '../common/pawn.service';

@Component({
  selector: 'app-pawn-game',
  templateUrl: './pawn-game.component.html',
  styleUrls: ['./pawn-game.component.scss'],
})
export class PawnGameComponent implements OnInit {
  dimension = 8;
  pawn: Pawn = {
    x: 0,
    y: 0,
    direction: Directions.NORTH,
    color: PawnColors.WHITE
  };
  directions = Directions;
  pawnValue: Pawn;
  logs: string[] = [];

  get isValidForm() {
    const pawn = this.pawn;
    if (pawn.x === null || pawn.y === null) {
      return false;
    }
    return pawn.x >= 0 && pawn.x <= 7 && pawn.y >= 0 && pawn.y <= 7 && !!pawn.direction && !!pawn.color;
  }

  constructor(private service: PawnService) {

  }

  ngOnInit() { }

  place() {
    this.pawn.direction = Number(this.pawn.direction);
    if (!this.isValidDirection(this.pawn.direction)) {
      alert('Please select a valid Direction!!');
      return;
    }

    this.pawnValue = this.pawn;
    this.log(`PLACE ${this.pawn.x},${this.pawn.y},${getDirectionFromVal(this.pawn.direction)},${getColorFromVal(this.pawn.color)}`);
  }

  move(count = 1) {
    if ((this.pawnValue.y === 7 && this.pawnValue.direction === Directions.EAST) ||
      (this.pawnValue.y === 0 && this.pawnValue.direction === Directions.WEST) ||
      (this.pawnValue.x === 7 && this.pawnValue.direction === Directions.NORTH) ||
      (this.pawnValue.x === 0 && this.pawnValue.direction === Directions.SOUTH)) {
      alert('Pawn at edge!! Please change the direction and try Move action again');
      return;
    }

    if(count === 2 && ((this.pawnValue.y === 6 && this.pawnValue.direction === Directions.EAST) ||
    (this.pawnValue.y === 1 && this.pawnValue.direction === Directions.WEST) ||
    (this.pawnValue.x === 6 && this.pawnValue.direction === Directions.NORTH) ||
    (this.pawnValue.x === 1 && this.pawnValue.direction === Directions.SOUTH))) {
      alert('Pawn will go out!! Please change the direction and try Move action again');
      return;
    }

    switch (this.pawnValue.direction) {
      case Directions.NORTH:
        this.pawnValue.x = this.pawnValue.x + count;
        break;

      case Directions.SOUTH:
        this.pawnValue.x = this.pawnValue.x - count;
        break;

      case Directions.EAST:
        this.pawnValue.y = this.pawnValue.y + count;
        break;

      case Directions.WEST:
        this.pawnValue.y = this.pawnValue.y - count;
        break;

      default:
        break;
    }
    this.service.updatePosition(this.pawnValue);
    if (this.logs.length === 1) {
      this.log(`MOVE ${count}`);
    } else {
      this.log(`MOVE`);
    }
  }

  left() {
    if ((this.pawnValue.y === 7 && this.pawnValue.direction === Directions.SOUTH) ||
      (this.pawnValue.y === 0 && this.pawnValue.direction === Directions.NORTH) ||
      (this.pawnValue.x === 7 && this.pawnValue.direction === Directions.EAST) ||
      (this.pawnValue.x === 0 && this.pawnValue.direction === Directions.WEST)) {
      alert('Pawn at edge!! Please use Move or Right action instead');
      return;
    }

    switch (this.pawnValue.direction) {
      case Directions.NORTH:
        this.pawnValue.direction = Directions.WEST;
        break;

      case Directions.SOUTH:
        this.pawnValue.direction = Directions.EAST;
        break;

      case Directions.EAST:
        this.pawnValue.direction = Directions.NORTH;
        break;

      case Directions.WEST:
        this.pawnValue.direction = Directions.SOUTH;
        break;

      default:
        break;
    }

    this.service.updatePosition(this.pawnValue);
    this.log(`LEFT`);
  }

  right() {
    if ((this.pawnValue.y === 7 && this.pawnValue.direction === Directions.NORTH) ||
      (this.pawnValue.y === 0 && this.pawnValue.direction === Directions.SOUTH) ||
      (this.pawnValue.x === 7 && this.pawnValue.direction === Directions.WEST) ||
      (this.pawnValue.x === 0 && this.pawnValue.direction === Directions.EAST)) {
      alert('Pawn at edge!! Please use Move or Left action instead');
      return;
    }

    switch (this.pawnValue.direction) {
      case Directions.NORTH:
        this.pawnValue.direction = Directions.EAST;
        break;

      case Directions.SOUTH:
        this.pawnValue.direction = Directions.WEST;
        break;

      case Directions.EAST:
        this.pawnValue.direction = Directions.SOUTH;
        break;

      case Directions.WEST:
        this.pawnValue.direction = Directions.NORTH;
        break;

      default:
        break;
    }

    this.service.updatePosition(this.pawnValue);
    this.log(`RIGHT`);
  }

  report() {
    alert(`${this.pawnValue.x},${this.pawnValue.y},${getDirectionFromVal(this.pawnValue.direction)},${getColorFromVal(this.pawnValue.color)}`);
    this.log(`REPORT ${this.pawnValue.x},${this.pawnValue.y},${getDirectionFromVal(this.pawnValue.direction)},${getColorFromVal(this.pawnValue.color)}`);
  }

  reset() {
    if(confirm('This action will reset the pawn and logs, Are you sure want to continue?')){
      this.pawn = {
        x: 0,
        y: 0,
        direction: Directions.NORTH,
        color: PawnColors.WHITE
      };
      this.pawnValue = null;
      this.logs = [];
      this.service.updatePosition(null);
    }
  }
  
  isValidDirection(direction: Directions): boolean {
    let directions = [
      { value: Directions.NORTH, label: 'NORTH' },
      { value: Directions.SOUTH, label: 'SOUTH' },
      { value: Directions.WEST, label: 'WEST' },
      { value: Directions.EAST, label: 'EAST' }
    ];
    if (this.pawn.x === 0) { // Remove South
      directions = directions.filter(x => x.value !== Directions.SOUTH);
    }
    if (this.pawn.y === 0) { // Remove West
      directions = directions.filter(x => x.value !== Directions.WEST);
    }
    if (this.pawn.x === 7) { // Remove North
      directions = directions.filter(x => x.value !== Directions.NORTH);
    }
    if (this.pawn.y === 7) { // Remove East
      directions = directions.filter(x => x.value !== Directions.EAST);
    }
    const isValid = directions.find(x => x.value === direction);
    return !!isValid;
  }

  log(value: string): void {
    this.logs.push(value);
  }
}
