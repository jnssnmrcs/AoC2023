import { pointString } from './10.1.ts';
import { Line } from './13.1.ts';
import { parseGrid } from './util.ts';

export function main(input: string) {
  const patterns = input.split(/\r?\n\r?\n/g);

  return patterns.reduce((sum, pattern) => {
    const [grid, width, height] = parseGrid(pattern);
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
    const verticalErrors = new Map<Line, Set<string>>(
      verticalReflections.map((line) => [line, new Set<string>()]),
    );
    const horizontalErrors = new Map<Line, Set<string>>(
      horizontalReflections.map((line) => [line, new Set<string>()]),
    );

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cell = grid[x][y];

        verticalReflections = verticalReflections.filter((line) => {
          const lookahead = verticalLookahead.get(line)!;
          const errors = verticalErrors.get(line)!;
          const [from, to] = line;

          if (x <= from) {
            const mirroredPoint = { x: from - x + to, y };
            lookahead.set(pointString(mirroredPoint), cell);
            return true;
          } else if (x >= to) {
            const expectedValue = lookahead.get(pointString({ x, y }));

            if (expectedValue !== undefined && expectedValue !== cell) {
              errors.add(pointString({ x, y }));

              if (errors.size > 1) {
                return false;
              }
            }

            return true;
          }
        });

        horizontalReflections = horizontalReflections.filter((line) => {
          const lookahead = horizontalLookahead.get(line)!;
          const [from, to] = line;
          const errors = horizontalErrors.get(line)!;

          if (y <= from) {
            const mirroredPoint = { x, y: from - y + to };
            lookahead.set(pointString(mirroredPoint), cell);
            return true;
          } else if (y >= to) {
            const expectedValue = lookahead.get(pointString({ x, y }));

            if (expectedValue !== undefined && expectedValue !== cell) {
              errors.add(pointString({ x, y }));

              if (errors.size > 1) {
                return false;
              }
            }

            return true;
          }
        });
      }
    }

    for (const [[_, to], errors] of verticalErrors) {
      if (errors.size === 1) {
        return sum + to;
      }
    }

    for (const [[_, to], errors] of horizontalErrors) {
      if (errors.size === 1) {
        return sum + to * 100;
      }
    }

    return sum;
  }, 0);
}
