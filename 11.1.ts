import { manhattanDistance, pairs, Point } from './util.ts';

export function parseInput(input: string): [string[][], number, number] {
  const lines = input.split(/\r?\n/);
  const grid: string[][] = [];
  const height = lines.length;
  const width = lines[0].length;

  for (const [y, line] of lines.entries()) {
    let x = 0;

    for (const character of line) {
      if (!grid[x]) {
        grid[x] = [];
      }

      grid[x][y] = character;

      x++;
    }
  }

  return [grid, width, height];
}

function printGrid(grid: string[][], width: number, height: number) {
  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      line += grid[x][y];
    }
    console.log(line);
  }
}

function insertColumn(grid: string[][], column: number, height: number) {
  const newColumn = Array(height).fill('.');
  grid.splice(column, 0, newColumn);
}

function insertRow(grid: string[][], row: number, width: number) {
  for (let x = 0; x < width; x++) {
    grid[x].splice(row, 0, '.');
  }
}

function expandColumns(grid: string[][], width: number, height: number) {
  let inserted = 0;

  for (let x = 0; x < width; x++) {
    let expand = true;

    for (let y = 0; y < height; y++) {
      if (grid[x + inserted][y] !== '.') {
        expand = false;
        break;
      }
    }

    if (expand) {
      insertColumn(grid, x + inserted, height);
      inserted++;
    }
  }

  return width + inserted;
}

function expandRows(grid: string[][], width: number, height: number) {
  let inserted = 0;

  for (let y = 0; y < height; y++) {
    let expand = true;

    for (let x = 0; x < width; x++) {
      if (grid[x][y + inserted] !== '.') {
        expand = false;
        break;
      }
    }

    if (expand) {
      insertRow(grid, y + inserted, width);
      inserted++;
    }
  }

  return height + inserted;
}

export function findGalaxies(
  grid: string[][],
  width: number,
  height: number,
): Point[] {
  const galaxies: Point[] = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (grid[x][y] === '#') {
        galaxies.push({ x, y });
      }
    }
  }

  return galaxies;
}

export function main(input: string) {
  const [grid, width, height] = parseInput(input);
  const newWidth = expandColumns(grid, width, height);
  const newHeight = expandRows(grid, newWidth, height);
  const galaxies = findGalaxies(grid, newWidth, newHeight);
  let sum = 0;

  for (const [a, b] of pairs(galaxies)) {
    sum += manhattanDistance(a, b);
  }

  return sum;
}
