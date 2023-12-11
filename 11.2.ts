import { findGalaxies, parseInput } from './11.1.ts';
import { pairs } from './util.ts';
import { manhattanDistance } from './util.ts';

function emptyRows(grid: string[][], width: number, from: number, to: number) {
  let count = 0;

  for (let y = from; y <= to; y++) {
    let empty = true;

    for (let x = 0; x < width; x++) {
      if (grid[x][y] !== '.') {
        empty = false;
        break;
      }
    }

    if (empty) {
      count++;
    }
  }

  return count;
}
function emptyColumns(
  grid: string[][],
  from: number,
  to: number,
) {
  let count = 0;

  for (let x = from; x <= to; x++) {
    if (grid[x].every((cell) => cell === '.')) {
      count++;
    }
  }

  return count;
}

export function main(input: string) {
  const [grid, width, height] = parseInput(input);
  const galaxies = findGalaxies(grid, width, height);
  let sum = 0;

  for (const [a, b] of pairs(galaxies)) {
    const distance = manhattanDistance(a, b);
    const emptyRowsCount = emptyRows(
      grid,
      width,
      Math.min(a.y, b.y),
      Math.max(a.y, b.y),
    );
    const emptyColumnsCount = emptyColumns(
      grid,
      Math.min(a.x, b.x),
      Math.max(a.x, b.x),
    );

    sum += distance + emptyRowsCount * 1_000_000 - emptyRowsCount +
      emptyColumnsCount * 1_000_000 - emptyColumnsCount;
  }

  return sum;
}
