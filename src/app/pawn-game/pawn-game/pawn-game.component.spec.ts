import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChessSquareComponent } from '../chess-square/chess-square.component';
import { Directions, getColorFromVal, getDirectionFromVal, PawnColors } from '../common/constant';

import { PawnGameComponent } from './pawn-game.component';

describe('PawnGameComponent', () => {
  let component: PawnGameComponent;
  let fixture: ComponentFixture<PawnGameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PawnGameComponent, ChessSquareComponent],
      imports: [IonicModule.forRoot(), FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PawnGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constants', () => {
    it('getDirectionFromVal:: should return direction string from enum value', () => {
      expect(getDirectionFromVal(Directions.NORTH)).toEqual('NORTH');
      expect(getDirectionFromVal(Directions.SOUTH)).toEqual('SOUTH');
      expect(getDirectionFromVal(Directions.EAST)).toEqual('EAST');
      expect(getDirectionFromVal(Directions.WEST)).toEqual('WEST');
      expect(getDirectionFromVal(null)).toEqual('');
    });

    it('getColorFromVal:: should return color string from enum value', () => {
      expect(getColorFromVal(PawnColors.BLACK)).toEqual('BLACK');
      expect(getColorFromVal(PawnColors.WHITE)).toEqual('WHITE');
      expect(getColorFromVal(null)).toEqual('');
    });
  });

  it('place:: should place pawn to given position', () => {
    spyOn(component, 'log');
    component.place();
    expect(component.pawnValue).toEqual(component.pawn);
    expect(component.log)
      .toHaveBeenCalledWith(`PLACE ${component.pawn.x},${component.pawn.y},${getDirectionFromVal(component.pawn.direction)},${getColorFromVal(component.pawn.color)}`);
  });

  it('place:: should show error if we try to place with invalid direction', () => {
    spyOn(component, 'log');
    spyOn(component, 'isValidDirection').and.returnValue(false);
    component.place();
    expect(component.pawnValue).not.toEqual(component.pawn);
    expect(component.log).not.toHaveBeenCalled();
  });

  describe('move', () => {
    beforeEach(() => {
      spyOn(component, 'log').and.callThrough();
      component.pawnValue = { x: 0, y: 0, direction: Directions.NORTH, color: PawnColors.WHITE };
    });

    it('should move pawn to north direction', () => {
      component.log('test')
      component.move();
      expect(component.pawnValue.x).toEqual(1);
      expect(component.log).toHaveBeenCalledWith('MOVE 1');
    });

    it('should move pawn to south direction', () => {
      component.pawnValue.direction = Directions.SOUTH;
      component.pawnValue.x = 2;
      component.move();
      expect(component.pawnValue.x).toEqual(1);
      expect(component.log).toHaveBeenCalledOnceWith('MOVE');
    });

    it('should move pawn to east direction', () => {
      component.pawnValue.direction = Directions.EAST;
      component.move();
      expect(component.pawnValue.y).toEqual(1);
      expect(component.log).toHaveBeenCalledOnceWith('MOVE');
    });

    it('should move pawn to west direction', () => {
      component.pawnValue.direction = Directions.WEST;
      component.pawnValue.y = 1;
      component.move();
      expect(component.pawnValue.x).toEqual(0);
      expect(component.log).toHaveBeenCalledOnceWith('MOVE');
    });

    it('should not move if direction is wrong', () => {
      component.pawnValue.direction = null;
      component.move();
      expect(component.pawnValue.x).toEqual(0);
      expect(component.log).toHaveBeenCalledOnceWith('MOVE');
    });

    it('should not move if pawn is at edge', () => {
      component.pawnValue.y = 7;
      component.pawnValue.direction = Directions.EAST;
      component.move();
      expect(component.log).not.toHaveBeenCalled();
    });

    it('should not move if pawn is at edge', () => {
      component.pawnValue.x = 7;
      component.pawnValue.direction = Directions.NORTH;
      component.move();
      expect(component.log).not.toHaveBeenCalled();
    });

    it('should not move if it is at second last position and need to move for 2 count', () => {
      component.pawnValue.y = 6;
      component.pawnValue.direction = Directions.EAST;
      component.move(2);
      expect(component.log).not.toHaveBeenCalled();
    });

    it('should not move if it is at second last position and need to move for 2 count', () => {
      component.pawnValue.x = 6;
      component.pawnValue.direction = Directions.NORTH;
      component.move(2);
      expect(component.log).not.toHaveBeenCalled();
    });

    it('should not move if it is at second last position and need to move for 2 count', () => {
      component.pawnValue.y = 1;
      component.pawnValue.direction = Directions.WEST;
      component.move(2);
      expect(component.log).not.toHaveBeenCalled();
    });

    it('should not move if it is at second last position and need to move for 2 count', () => {
      component.pawnValue.x = 1;
      component.pawnValue.direction = Directions.SOUTH;
      component.move(2);
      expect(component.log).not.toHaveBeenCalled();
    });
  });

  describe('left', () => {
    beforeEach(() => {
      spyOn(component, 'log').and.callThrough();
      component.pawnValue = { x: 1, y: 1, direction: Directions.NORTH, color: PawnColors.WHITE };
    });

    it('should move pawn direction to left', () => {
      component.left();
      expect(component.pawnValue.direction).toEqual(Directions.WEST);

      component.left();
      expect(component.pawnValue.direction).toEqual(Directions.SOUTH);

      component.left();
      expect(component.pawnValue.direction).toEqual(Directions.EAST);

      component.left();
      expect(component.pawnValue.direction).toEqual(Directions.NORTH);

      component.pawnValue.direction = null;
      component.left();

      expect(component.log).toHaveBeenCalledTimes(5);
      expect(component.log).toHaveBeenCalledWith('LEFT');
    });

    it('should not move pawn direction to left if selected direction is on edge', () => {
      component.pawnValue.x = 0;
      component.pawnValue.direction = Directions.WEST;
      component.left();
      expect(component.log).not.toHaveBeenCalled();
    });

    it('should not move pawn direction to left if selected direction is on edge', () => {
      component.pawnValue.y = 0;
      component.pawnValue.direction = Directions.NORTH;
      component.left();
      expect(component.log).not.toHaveBeenCalled();
    });

    it('should not move pawn direction to left if selected direction is on edge', () => {
      component.pawnValue.y = 7;
      component.pawnValue.direction = Directions.SOUTH;
      component.left();
      expect(component.log).not.toHaveBeenCalled();
    });

    it('should not move pawn direction to left if selected direction is on edge', () => {
      component.pawnValue.x = 7;
      component.pawnValue.direction = Directions.EAST;
      component.left();
      expect(component.log).not.toHaveBeenCalled();
    });
  });

  describe('right', () => {
    beforeEach(() => {
      spyOn(component, 'log').and.callThrough();
      component.pawnValue = { x: 1, y: 1, direction: Directions.NORTH, color: PawnColors.WHITE };
    });

    it('should move pawn direction to left', () => {
      component.right();
      expect(component.pawnValue.direction).toEqual(Directions.EAST);

      component.right();
      expect(component.pawnValue.direction).toEqual(Directions.SOUTH);

      component.right();
      expect(component.pawnValue.direction).toEqual(Directions.WEST);

      component.right();
      expect(component.pawnValue.direction).toEqual(Directions.NORTH);

      component.pawnValue.direction = null;
      component.right();

      expect(component.log).toHaveBeenCalledTimes(5);
      expect(component.log).toHaveBeenCalledWith('RIGHT');
    });

    it('should not move pawn direction to left if selected direction is on edge', () => {
      component.pawnValue.x = 0;
      component.pawnValue.direction = Directions.EAST;
      component.right();
      expect(component.log).not.toHaveBeenCalled();
    });

    it('should not move pawn direction to left if selected direction is on edge', () => {
      component.pawnValue.y = 0;
      component.pawnValue.direction = Directions.SOUTH;
      component.right();
      expect(component.log).not.toHaveBeenCalled();
    });

    it('should not move pawn direction to left if selected direction is on edge', () => {
      component.pawnValue.y = 7;
      component.pawnValue.direction = Directions.NORTH;
      component.right();
      expect(component.log).not.toHaveBeenCalled();
    });

    it('should not move pawn direction to left if selected direction is on edge', () => {
      component.pawnValue.x = 7;
      component.pawnValue.direction = Directions.WEST;
      component.right();
      expect(component.log).not.toHaveBeenCalled();
    });
  });

  it('isValidForm:: should return true or false based on form is valid or not', () => {
    expect(component.isValidForm).toBeTruthy();
    component.pawn.y = null;
    expect(component.isValidForm).toBeFalsy();
  });

  it('report:: should show output and log the same', () => {
    component.pawnValue = { x: 1, y: 1, direction: Directions.NORTH, color: PawnColors.WHITE };
    spyOn(component, 'log');
    component.report();
    expect(component.log).toHaveBeenCalledWith('REPORT 1,1,NORTH,WHITE');
  });

  it('reset:: should reset the pawn', () => {
    component.pawnValue = { x: 1, y: 1, direction: Directions.NORTH, color: PawnColors.WHITE };
    spyOn(window, 'confirm').and.callFake(function () {
      return true;
    });
    component.reset();
    expect(component.pawnValue).toEqual(null);
    expect(component.logs.length).toEqual(0);
  });

  it('isValidDirection:: should return false if passed direction goes to edge based on pawn position', () => {
    component.pawn.x = 7;
    expect(component.isValidDirection(Directions.NORTH)).toBeFalsy();

    component.pawn.y = 7;
    expect(component.isValidDirection(Directions.EAST)).toBeFalsy();
  });
});
