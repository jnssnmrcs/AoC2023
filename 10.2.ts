import { findCycle, parseInput, PipeSymbol, pointString } from './10.1.ts';

export function main(input: string) {
  const [grid, start, width, height] = parseInput(input);
  const cycle = findCycle(grid, start);

  if (!cycle) {
    throw new Error('Found no cycle');
  }

  const pointsInCycle = new Set(cycle.map(pointString));
  let count = 0;

  for (let y = 0; y < height; y++) {
    let inside = false;
    let opener: PipeSymbol | undefined;

    for (let x = 0; x < width; x++) {
      const cell = grid[x][y];

      if (pointsInCycle.has(pointString({ x, y }))) {
        const pipe = cell[2] as PipeSymbol;

        if (pipe === '|') {
          inside = !inside;
        } else if (pipe === '-') {
          continue;
        } else if (opener) {
          if (
            (opener === 'F' && pipe === 'J') || (opener === 'L' && pipe === '7')
          ) {
            inside = !inside;
          }

          opener = undefined;
        } else {
          opener = pipe;
        }
      } else if (inside) {
        count++;
      }
    }
  }

  return count;
}
