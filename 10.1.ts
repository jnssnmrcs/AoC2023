import { Point } from './util.ts';

export type PipeSymbol = '|' | '-' | 'L' | 'J' | '7' | 'F';
export type CardinalDirection = 'north' | 'south' | 'east' | 'west';
export type GridPipe = [CardinalDirection, CardinalDirection, PipeSymbol];
export type GridCell = GridPipe | 'ground';
export type Grid = GridCell[][];

export const gridCellMap: Record<string, GridCell> = {
  '|': ['north', 'south', '|'],
  '-': ['east', 'west', '-'],
  'L': ['north', 'east', 'L'],
  'J': ['north', 'west', 'J'],
  '7': ['south', 'west', '7'],
  'F': ['south', 'east', 'F'],
  '.': 'ground',
  'S': 'ground',
};

export function parseInput(
  input: string,
): [grid: Grid, start: Point, width: number, height: number] {
  const grid: GridCell[][] = [];
  const lines = input.split(/\r?\n/);
  const height = lines.length;
  const width = lines[0].length;
  let start: Point | undefined;

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

  return [grid, start, width, height];
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
export const getCell = (grid: Grid, { x, y }: Point): GridCell | undefined =>
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
export const pointString = ({ x, y }: Point) => `(${x},${y})`;
export const pointsEqual = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

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
    const cellA = getCell(grid, positionA);
    const cellB = getCell(grid, positionB);
    const cellAConnected = cellA?.includes(getOppositeDirection(directionA));
    const cellBConnected = cellB?.includes(getOppositeDirection(directionB));
    const bothVisited = visited.has(pointString(positionA)) &&
      visited.has(pointString(positionB));

    if (bothVisited) {
      // If one of them is the start position and it's connected, we have a cycle
      if (
        (pointsEqual(positionA, start) && cellAConnected) ||
        (pointsEqual(positionB, start) && cellBConnected)
      ) {
        return path;
      }

      return;
    }

    const nextDirection = visited.has(pointString(positionA))
      ? directionB
      : directionA;
    const nextPosition = visited.has(pointString(positionA))
      ? positionB
      : positionA;
    const nextCell = getCell(grid, nextPosition);
    const nextCellConnected = nextCell?.includes(
      getOppositeDirection(nextDirection),
    );

    if (!nextCell || !nextCellConnected) {
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
    const newCell = gridCellMap[pipe];

    grid[start.x][start.y] = newCell;

    const cycle = getCycle(grid, start);

    if (cycle) {
      return cycle;
    }
  }
}

export function main(input: string) {
  const [grid, start] = parseInput(input);
  const cycle = findCycle(grid, start);

  if (!cycle) {
    throw new Error('Found no cycle');
  }

  return cycle.length / 2;
}
