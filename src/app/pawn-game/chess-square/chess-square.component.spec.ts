import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { Directions, PawnColors } from '../common/constant';
import { PawnService } from '../common/pawn.service';

import { ChessSquareComponent } from './chess-square.component';

describe('ChessSquareComponent', () => {
  let component: ChessSquareComponent;
  let fixture: ComponentFixture<ChessSquareComponent>;
  let service: jasmine.SpyObj<PawnService>;

  beforeEach(waitForAsync(() => {
    const serviceSpy = jasmine.createSpyObj(['PawnService', 'updatePosition', 'getUpdatedPosition']);
    TestBed.configureTestingModule({
      declarations: [ChessSquareComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: PawnService, useValue: serviceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ChessSquareComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PawnService) as jasmine.SpyObj<PawnService>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isActive if selected dimension matches', () => {
    component.x = 0;
    component.y = 0;
    component.pawn = { x: 0, y: 0, direction: Directions.EAST, color: PawnColors.BLACK };
    expect(component.isActive).toBeTruthy();
  });

  it('should not set isActive if selected dimension does not match', () => {
    component.x = 0;
    component.y = 0;
    component.pawn = null;
    expect(component.isActive).toBeFalsy();
  });

  it('should read updating values from service and set block active or inactive', () => {
    component.x = 0;
    component.y = 0;
    component.pawn = { x: 0, y: 1, direction: Directions.EAST, color: PawnColors.BLACK };
    service.getUpdatedPosition.and.returnValue(of({ x: 0, y: 0, direction: Directions.EAST, color: PawnColors.BLACK }));
    fixture.detectChanges();
    expect(component.isActive).toBeTruthy();
  });

  it('should read updating values from service and set block active or inactive', () => {
    component.x = 0;
    component.y = 0;
    component.pawn = { x: 0, y: 1, direction: Directions.EAST, color: PawnColors.BLACK };
    service.getUpdatedPosition.and.returnValue(of({ x: 0, y: 1, direction: Directions.EAST, color: PawnColors.BLACK }));
    fixture.detectChanges();
    expect(component.isActive).toBeFalsy();
  });
});
