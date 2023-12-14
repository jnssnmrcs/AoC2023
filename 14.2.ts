import { tilt } from './14.1.ts';
import { gridToString, parseGrid } from './util.ts';

export function cycles(
  count: number,
  grid: string[][],
  width: number,
  height: number,
) {
  const cache = new Map<string, number>();
  const cycleToLoad = new Map<number, number>();
  let load = 0;

  for (let i = 0; i < count; i++) {
    const cycle = i + 1;

    tilt(grid, width, height, 'north');
    tilt(grid, width, height, 'west');
    tilt(grid, width, height, 'south');
    load = tilt(grid, width, height, 'east');

    const gridString = gridToString(grid, width, height);
    const cached = cache.get(gridString);

    // If we end up on a cached grid, we have a cycle
    if (cached) {
      const preCycles = cached; // count before cycle
      const cycleSize = cycle - preCycles; // Length of cycle
      const endCycle = (count - preCycles) % cycleSize + preCycles; // Will end up on this cycle

      return cycleToLoad.get(endCycle);
    } else {
      cache.set(gridString, cycle);
      cycleToLoad.set(cycle, load);
    }
  }

  return load;
}

export function main(input: string) {
  const [grid, width, height] = parseGrid(input);
  const load = cycles(1_000_000_000, grid, width, height);

  return load;
}
