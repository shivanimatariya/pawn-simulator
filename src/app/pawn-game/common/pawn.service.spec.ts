import { TestBed } from '@angular/core/testing';
import { Directions, PawnColors } from './constant';

import { PawnService } from './pawn.service';

describe('PawnService', () => {
  let service: PawnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PawnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('updatePosition:: should update the position of pawn and add updated value to subject', () => {
    // @ts-ignore
    spyOn(service.position, 'next');
    service.updatePosition({ x: 0, y: 1, direction: Directions.EAST, color: PawnColors.BLACK });
    // @ts-ignore
    expect(service.position.next).toHaveBeenCalledOnceWith({ x: 0, y: 1, direction: Directions.EAST, color: PawnColors.BLACK });
  });

  it('getUpdatedPosition:: should return updated position as observable', () => {
    service.getUpdatedPosition().subscribe(x => {
      expect(x).toEqual({ x: 0, y: 1, direction: Directions.EAST, color: PawnColors.BLACK });
    });
    service.updatePosition({ x: 0, y: 1, direction: Directions.EAST, color: PawnColors.BLACK });
  });
});
