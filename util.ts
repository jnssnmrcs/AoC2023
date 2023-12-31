export function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return [...new Set(a)].filter((x) => setB.has(x));
}

export type Point = {
  x: number;
  y: number;
};

export function getPointsAround(
  point: Point,
  includeDiagonals = false,
): Point[] {
  const { x, y } = point;
  const points = [
    { x, y: y - 1 },
    { x, y: y + 1 },
    { x: x - 1, y },
    { x: x + 1, y },
  ];

  if (includeDiagonals) {
    points.push(
      { x: x - 1, y: y - 1 },
      { x: x + 1, y: y + 1 },
      { x: x - 1, y: y + 1 },
      { x: x + 1, y: y - 1 },
    );
  }

  return points;
}

export type Range = {
  from: number;
  to: number;
};

export function isWithinBoundaries(
  min: number,
  max: number,
  ...values: number[]
) {
  return values.every((value) => value >= min && value <= max);
}

export function rangeIntersection(a: Range, b: Range): Range | null {
  const min: Range = a.from < b.from ? a : b;
  const max: Range = min === a ? b : a;

  if (min.to < max.from) {
    return null;
  }

  return {
    from: max.from,
    to: min.to < max.to ? min.to : max.to,
  };
}

/**
 * Split range `a` into pieces that overlap range `b`, if any.
 */
export function splitRangeWithRange(a: Range, b: Range): Range[] {
  const ranges: Range[] = [];
  const points = [a.from];

  if (b.from > a.from && b.from < a.to) {
    points.push(b.from - 1, b.from);
  }

  if (b.to < a.to && b.to > a.from) {
    points.push(b.to, b.to + 1);
  }

  if (a.to === b.from) {
    points.push(a.to - 1, a.to);
  }

  if (a.from === b.to) {
    points.push(a.from, a.from + 1);
  }

  points.push(a.to);

  for (let i = 0; i < points.length - 1; i += 2) {
    ranges.push({
      from: points[i],
      to: points[i + 1],
    });
  }

  return ranges;
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function lcm(...numbers: number[]) {
  return unique(
    numbers.reduce<number[]>(
      (all, number) => [...all, ...primeFactors(number)],
      [],
    ),
  ).reduce((result, prime) => result * prime, 1);
}

export function primeFactors(number: number) {
  const factors = [];
  let divisor = 2;

  while (number >= 2) {
    if (number % divisor == 0) {
      factors.push(divisor);
      number = number / divisor;
    } else {
      divisor++;
    }
  }

  return factors;
}

export function* combinations<T>(items: T[][]): Generator<T[]> {
  const remainder = items.length > 1 ? combinations(items.slice(1)) : [[]];

  for (const r of remainder) {
    for (const h of items.at(0)!) {
      yield [h, ...r];
    }
  }
}

export function* pairs<T>(array: T[]) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i; j < array.length - 1; j++) {
      yield [array[i], array[j + 1]];
    }
  }
}

export function manhattanDistance(a: Point, b: Point) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function parseGrid(input: string): [string[][], number, number] {
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

export function printGrid(grid: string[][], width: number, height: number) {
  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      line += grid[x][y];
    }
    console.log(line);
  }
}

export function gridToString(grid: string[][], width: number, height: number) {
  let str = '';

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      str += grid[x][y];
    }
  }

  return str;
}
