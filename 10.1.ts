import { Point } from './util.ts';

export type CardinalDirection = 'north' | 'south' | 'east' | 'west';
export type GridPipe = [CardinalDirection, CardinalDirection];
export type GridCell = GridPipe | 'ground';
export type Grid = GridCell[][];

export const gridCellMap: Record<string, GridCell> = {
  '|': ['north', 'south'],
  '-': ['east', 'west'],
  'L': ['north', 'east'],
  'J': ['north', 'west'],
  '7': ['south', 'west'],
  'F': ['south', 'east'],
  '.': 'ground',
  'S': 'ground',
};

export function parseInput(input: string): [grid: Grid, start: Point] {
  const grid: GridCell[][] = [];
  let start: Point | undefined;
  const lines = input.split(/\r?\n/);

  for (const [y, line] of lines.entries()) {
    for (let x = 0; x < line.length; x++) {
      if (!grid[x]) {
        grid[x] = [];
      }

      if (line[x] === 'S') {
        start = { x, y };
      }

      grid[x][y] = gridCellMap[line[x]];
    }
  }

  if (!start) {
    throw new Error('Could not find start position');
  }

  return [grid, start];
}

const moveNorth = (from: Point) => ({
  ...from,
  y: from.y - 1,
});
const moveSouth = (from: Point) => ({
  ...from,
  y: from.y + 1,
});
const moveEast = (from: Point) => ({
  ...from,
  x: from.x + 1,
});
const moveWest = (from: Point) => ({
  ...from,
  x: from.x - 1,
});
const getCell = (grid: Grid, { x, y }: Point): GridCell | undefined =>
  grid[x]?.[y];
const movePosition = (position: Point, direction: CardinalDirection) => {
  switch (direction) {
    case 'north':
      return moveNorth(position);
    case 'south':
      return moveSouth(position);
    case 'east':
      return moveEast(position);
    case 'west':
      return moveWest(position);
  }
};
const getOppositeDirection = (direction: CardinalDirection) => {
  switch (direction) {
    case 'north':
      return 'south';
    case 'south':
      return 'north';
    case 'east':
      return 'west';
    case 'west':
      return 'east';
  }
};
const positionsConnected = (grid: Grid, a: Point, b: Point) => {
  const cellA = getCell(grid, a);
  const cellB = getCell(grid, b);

  return cellA && cellB && cellsConnected(cellA, cellB);
};
const cellsConnected = (a: GridCell, b: GridCell) =>
  a !== 'ground' && b !== 'ground' &&
  a.some((direction) => b.includes(getOppositeDirection(direction)));
const pointString = ({ x, y }: Point) => `(${x},${y})`;
const pointsEqual = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

export function getCycle(
  grid: Grid,
  start: Point,
): Point[] | undefined {
  const visited = new Set<string>([pointString(start)]);
  const path = [start];
  let current = start;

  while (true) {
    const currentCell = getCell(grid, current);

    if (!currentCell || currentCell === 'ground') {
      return;
    }

    const [directionA, directionB] = currentCell;
    const positionA = movePosition(current, directionA);
    const positionB = movePosition(current, directionB);
    const nextPosition = visited.has(pointString(positionA))
      ? positionB
      : positionA;

    // Both ends of pipe is visited
    if (visited.has(pointString(nextPosition))) {
      // If one of them is the start position and it's connected, we have a cycle
      if (
        (pointsEqual(positionA, start) &&
          positionsConnected(grid, positionA, start)) ||
        (pointsEqual(positionB, start) &&
          positionsConnected(grid, positionB, start))
      ) {
        return path;
      }

      return;
    }

    const nextCell = getCell(grid, nextPosition);

    if (!nextCell || !cellsConnected(currentCell, nextCell)) {
      return;
    }

    visited.add(pointString(nextPosition));
    path.push(nextPosition);

    current = nextPosition;
  }
}

export function findCycle(grid: Grid, start: Point) {
  for (const pipe of Object.keys(gridCellMap)) {
    if (pipe === '.' || pipe === 'S') continue;

    grid[start.x][start.y] = gridCellMap[pipe];

    const cycle = getCycle(grid, start);

    if (cycle) {
      return cycle;
    }
  }
}

export function main(input: string) {
  const cycle = findCycle(...parseInput(input));

  if (cycle) {
    return cycle.length / 2;
  }

  throw new Error('Found no cycle');
}
