import { parseGrid } from './util.ts';

export function main(input: string) {
  const [grid, width, height] = parseGrid(input);
  const currentHighestRock = new Map<number, number>();
  let load = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = grid[x][y];

      if (cell === '#') {
        currentHighestRock.set(x, y + 1);
      } else if (cell === 'O') {
        const highestY = currentHighestRock.get(x) ?? 0;

        if (highestY !== y) {
          grid[x][highestY] = 'O';
          grid[x][y] = '.';
        }

        load += height - highestY;

        currentHighestRock.set(x, highestY + 1);
      }
    }
  }

  return load;
}
