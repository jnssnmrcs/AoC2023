import { parseGrid, Point, printGrid } from './util.ts';

export function tilt(
  grid: string[][],
  width: number,
  height: number,
  direction: 'north' | 'east' | 'south' | 'west',
) {
  const yLimit = new Map<number, number>();
  const xLimit = new Map<number, number>();
  let load = 0;

  const handlePoint = ({ x, y }: Point) => {
    const cell = grid[x][y];

    if (cell === '#') {
      yLimit.set(x, direction === 'north' ? y + 1 : y - 1);
      xLimit.set(y, direction === 'west' ? x + 1 : x - 1);
    } else if (cell === 'O') {
      if (direction === 'east' || direction === 'west') {
        const limit = xLimit.get(y) ?? (direction === 'west' ? 0 : width - 1);

        if (limit !== x) {
          grid[limit][y] = 'O';
          grid[x][y] = '.';
        }

        load += height - y;

        xLimit.set(y, direction === 'west' ? limit + 1 : limit - 1);
      } else {
        const limit = yLimit.get(x) ?? (direction === 'north' ? 0 : height - 1);

        if (limit !== y) {
          grid[x][limit] = 'O';
          grid[x][y] = '.';
        }

        load += height - limit;

        yLimit.set(x, direction === 'north' ? limit + 1 : limit - 1);
      }
    }
  };

  switch (direction) {
    case 'west':
    case 'north':
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          handlePoint({ x, y });
        }
      }
      break;
    case 'east':
      for (let y = 0; y < height; y++) {
        for (let x = width - 1; x >= 0; x--) {
          handlePoint({ x, y });
        }
      }
      break;
    case 'south':
      for (let y = height - 1; y >= 0; y--) {
        for (let x = 0; x < width; x++) {
          handlePoint({ x, y });
        }
      }
      break;
  }

  return load;
}

export function main(input: string) {
  const [grid, width, height] = parseGrid(input);
  const load = tilt(grid, width, height, 'north');

  return load;
}
