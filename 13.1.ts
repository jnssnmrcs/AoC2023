import { pointString } from './10.1.ts';
import { parseInput } from './11.1.ts';

export type Line = [from: number, to: number];

export function main(input: string) {
  const patterns = input.split(/\r?\n\r?\n/g);

  return patterns.reduce((sum, pattern) => {
    const [grid, width, height] = parseInput(pattern);
    let horizontalReflections: Line[] = Array.from(
      { length: height - 1 },
      (_, i) => [i, i + 1],
    );
    let verticalReflections: Line[] = Array.from(
      { length: width - 1 },
      (_, i) => [i, i + 1],
    );
    const verticalLookahead = new Map<Line, Map<string, string>>(
      verticalReflections.map((line) => [line, new Map<string, string>()]),
    );
    const horizontalLookahead = new Map<Line, Map<string, string>>(
      horizontalReflections.map((line) => [line, new Map<string, string>()]),
    );

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cell = grid[x][y];

        verticalReflections = verticalReflections.filter((line) => {
          const lookahead = verticalLookahead.get(line)!;
          const [from, to] = line;

          if (x <= from) {
            const mirroredPoint = { x: from - x + to, y };
            lookahead.set(pointString(mirroredPoint), cell);
            return true;
          } else if (x >= to) {
            const expectedValue = lookahead.get(pointString({ x, y }));
            return expectedValue === undefined || expectedValue === cell;
          }
        });

        horizontalReflections = horizontalReflections.filter((line) => {
          const lookahead = horizontalLookahead.get(line)!;
          const [from, to] = line;

          if (y <= from) {
            const mirroredPoint = { x, y: from - y + to };
            lookahead.set(pointString(mirroredPoint), cell);
            return true;
          } else if (y >= to) {
            const expectedValue = lookahead.get(pointString({ x, y }));
            return expectedValue === undefined || expectedValue === cell;
          }
        });
      }
    }

    // Should contain one or zero items
    for (const [_, to] of verticalReflections) {
      return sum + to;
    }

    // Should contain one or zero items
    for (const [_, to] of horizontalReflections) {
      return sum + to * 100;
    }

    return sum;
  }, 0);
}
