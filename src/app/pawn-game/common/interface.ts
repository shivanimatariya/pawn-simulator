import { Directions, PawnColors } from "./constant";

export interface Pawn {
  x: number;
  y: number;
  direction: Directions;
  color: PawnColors;
}