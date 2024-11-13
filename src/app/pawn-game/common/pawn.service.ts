import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Pawn } from './interface';

@Injectable({
  providedIn: 'root'
})
export class PawnService {
  private position = new Subject<Pawn>();
  constructor() { }

  updatePosition(pawn: Pawn) {
    this.position.next(pawn);
  }

  getUpdatedPosition(): Observable<Pawn> {
    return this.position.asObservable();
  }
}
