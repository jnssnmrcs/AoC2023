import { pointString } from './10.1.ts';
import { parseGrid, Point } from './util.ts';

type Direction = 'up' | 'down' | 'left' | 'right';

export type Beam = {
  position: Point;
  direction: Direction;
};

export function isInsideGrid(
  width: number,
  height: number,
  { position: { x, y } }: Beam,
) {
  return x < width && x >= 0 && y < height && y >= 0;
}

export function moveInDirection(point: Point, direction: Direction): Point {
  const newPoint = {
    ...point,
  };

  switch (direction) {
    case 'up':
      newPoint.y--;
      break;
    case 'down':
      newPoint.y++;
      break;
    case 'left':
      newPoint.x--;
      break;
    case 'right':
      newPoint.x++;
      break;
  }

  return newPoint;
}

export function getEnergizedCount(
  grid: string[][],
  width: number,
  height: number,
  start: Beam,
) {
  let beams = [start];
  const beamsPassedThrough = new Map<string, Set<Direction>>();
  const energized = new Set<string>([pointString(beams[0].position)]);

  while (beams.length) {
    beams = beams.reduce<Beam[]>((prev, { direction, position }) => {
      const cell = grid[position.x][position.y];
      const newBeams: Beam[] = [];

      if (!beamsPassedThrough.has(pointString(position))) {
        beamsPassedThrough.set(pointString(position), new Set());
      }

      const passedThrough = beamsPassedThrough.get(pointString(position))!;

      if (passedThrough.has(direction)) {
        return prev;
      }

      passedThrough.add(direction);
      energized.add(pointString(position));

      if (
        cell === '|' &&
        (direction === 'left' || direction === 'right')
      ) {
        newBeams.push({
          position: moveInDirection(position, 'up'),
          direction: 'up',
        }, {
          position: moveInDirection(position, 'down'),
          direction: 'down',
        });
      } else if (
        cell === '-' && (direction === 'up' || direction === 'down')
      ) {
        newBeams.push({
          position: moveInDirection(position, 'left'),
          direction: 'left',
        }, {
          position: moveInDirection(position, 'right'),
          direction: 'right',
        });
      } else if (cell === '/') {
        const newBeam = {
          direction,
          position,
        };

        switch (direction) {
          case 'up':
            newBeam.position = moveInDirection(newBeam.position, 'right');
            newBeam.direction = 'right';
            break;
          case 'down':
            newBeam.position = moveInDirection(newBeam.position, 'left');
            newBeam.direction = 'left';
            break;
          case 'left':
            newBeam.position = moveInDirection(newBeam.position, 'down');
            newBeam.direction = 'down';
            break;
          case 'right':
            newBeam.position = moveInDirection(newBeam.position, 'up');
            newBeam.direction = 'up';
            break;
        }

        newBeams.push(newBeam);
      } else if (cell === '\\') {
        const newBeam = {
          direction,
          position,
        };

        switch (direction) {
          case 'up':
            newBeam.position = moveInDirection(newBeam.position, 'left');
            newBeam.direction = 'left';
            break;
          case 'down':
            newBeam.position = moveInDirection(newBeam.position, 'right');
            newBeam.direction = 'right';
            break;
          case 'left':
            newBeam.position = moveInDirection(newBeam.position, 'up');
            newBeam.direction = 'up';
            break;
          case 'right':
            newBeam.position = moveInDirection(newBeam.position, 'down');
            newBeam.direction = 'down';
            break;
        }

        newBeams.push(newBeam);
      } else {
        newBeams.push({
          direction,
          position: moveInDirection(position, direction),
        });
      }

      const newBeamsInsideGrid = newBeams.filter((beam) =>
        isInsideGrid(width, height, beam)
      );

      return [...prev, ...newBeamsInsideGrid];
    }, []);
  }

  return energized.size;
}

export function main(input: string) {
  const [grid, width, height] = parseGrid(input);
  const start: Beam = {
    position: { x: 0, y: 0 },
    direction: 'right',
  };

  return getEnergizedCount(grid, width, height, start);
}
