import { parseInput, SeedMap } from './5.1.ts';
import { Range, rangeIntersection, splitRangeWithRange } from './util.ts';

function getDestinationRanges(range: Range, maps: SeedMap[]): Range[] {
  // Split source range into new ranges to match maps
  const sourceRanges = maps.reduce<Range[]>((ranges, map) => {
    return ranges.reduce<Range[]>((splitRanges, range) => {
      splitRanges.push(...splitRangeWithRange(range, map.source));

      return splitRanges;
    }, []);
  }, [range]);

  // Convert source ranges using maps
  return sourceRanges.reduce<Range[]>((ranges, range) => {
    const map = maps.find(({ source }) => rangeIntersection(range, source));

    if (!map) {
      ranges.push(range);
    } else {
      const offset = map.destination.from - map.source.from;

      ranges.push({
        from: range.from + offset,
        to: range.to + offset,
      });
    }

    return ranges;
  }, []);
}

export function main(input: string) {
  const data = input.split(/\r?\n\r?\n/g);
  const seeds = data.shift()?.match(/\d+/g)?.map((value) => parseInt(value)) ??
    [];
  const maps = data.map(parseInput);
  const seedRanges: Range[] = [];

  for (let i = 0; i < seeds.length - 1; i += 2) {
    seedRanges.push({ from: seeds[i], to: seeds[i] + seeds[i + 1] - 1 });
  }

  const lowest = seedRanges.reduce((lowest, seedRange) => {
    const locationRanges = maps.reduce((ranges, maps) => {
      const newRanges: Range[] = [];

      for (const range of ranges) {
        newRanges.push(...getDestinationRanges(range, maps));
      }

      return newRanges;
    }, [seedRange]);
    const lowestLocation = locationRanges.reduce(
      (previousLowest, range) => Math.min(previousLowest, range.from),
      lowest,
    );

    return lowestLocation;
  }, Infinity);

  return lowest;
}
