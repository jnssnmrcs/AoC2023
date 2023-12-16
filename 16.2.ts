import { Beam, getEnergizedCount } from './16.1.ts';
import { parseGrid } from './util.ts';

export function main(input: string) {
  const [grid, width, height] = parseGrid(input);
  let max = -Infinity;

  for (let x = 0; x < width; x++) {
    const start1: Beam = {
      position: { x, y: 0 },
      direction: 'down',
    };

    max = Math.max(max, getEnergizedCount(grid, width, height, start1));

    const start2: Beam = {
      position: { x, y: height - 1 },
      direction: 'up',
    };

    max = Math.max(max, getEnergizedCount(grid, width, height, start2));
  }

  for (let y = 0; y < width; y++) {
    const start1: Beam = {
      position: { x: 0, y },
      direction: 'right',
    };

    max = Math.max(max, getEnergizedCount(grid, width, height, start1));

    const start2: Beam = {
      position: { x: width - 1, y },
      direction: 'left',
    };

    max = Math.max(max, getEnergizedCount(grid, width, height, start2));
  }

  return max;
}
