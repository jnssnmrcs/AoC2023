export function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return [...new Set(a)].filter((x) => setB.has(x));
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
