import { isWithinBoundaries, Range } from './util.ts';

export type SeedMap = {
  source: Range;
  destination: Range;
};

export function parseInput(input: string): SeedMap[] {
  const matches = input.matchAll(/(\d+)\s(\d+)\s(\d+)/g);

  return [...matches].map((match) => {
    const destinationStart = parseInt(match[1]);
    const sourceStart = parseInt(match[2]);
    const length = parseInt(match[3]);

    return {
      destination: {
        from: destinationStart,
        to: destinationStart + length - 1,
      },
      source: {
        from: sourceStart,
        to: sourceStart + length - 1,
      },
    };
  });
}

export function main(input: string) {
  const data = input.split(/\r?\n\r?\n/g);
  const seeds = data.shift()?.match(/\d+/g)?.map((value) => parseInt(value)) ??
    [];
  const maps = data.map(parseInput);

  function getDestinationValue(map: SeedMap, value: number) {
    const offset = map.destination.from - map.source.from;

    return value + offset;
  }

  const lowest = seeds?.reduce((lowest, seed) => {
    const location = maps.reduce((value, maps) => {
      const map = maps.find((
        { source: { from, to } },
      ) => isWithinBoundaries(from, to, value));
      const newValue = map ? getDestinationValue(map, value) : value;

      return newValue;
    }, seed);

    return location < lowest ? location : lowest;
  }, Infinity);

  return lowest;
}
