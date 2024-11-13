export enum Directions {
  NORTH = 1,
  SOUTH = 2,
  WEST = 3,
  EAST = 4
}

export enum PawnColors {
  WHITE = 1,
  BLACK = 2
}

export const getDirectionFromVal = (direction): string => {
  if (direction === Directions.NORTH) {
    return 'NORTH'
  } else if (direction === Directions.SOUTH) {
    return 'SOUTH';
  } else if (direction === Directions.EAST) {
    return 'EAST';
  } else if (direction === Directions.WEST) {
    return 'WEST';
  }
  return '';
}

export const getColorFromVal = (color): string => {
  if (color === PawnColors.BLACK) {
    return 'BLACK';
  } else if (color === PawnColors.WHITE) {
    return 'WHITE';
  }
  return '';
}