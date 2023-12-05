import { getPointsAround } from './util.ts';

export function main(input: string): number {
  const lines = input.split('\n');

  return input.split('\n').reduce((sum, line, y) => {
    const matches = line.matchAll(/\d+/g);
    let lineSum = 0;

    for (const match of matches) {
      if (match.index === undefined) {
        continue;
      }

      const number = match[0];

      for (let i = 0; i < number.length; i++) {
        const x = match.index + i;
        const isPartNumber = getPointsAround({ x, y }, true).some((point) => {
          const character = lines[point.y]?.[point.x] ?? '';
          const isSymbol = /[^\d\.\s]/.test(character);

          return isSymbol;
        });

        if (isPartNumber) {
          lineSum += parseInt(number);
          break;
        }
      }
    }

    return sum + lineSum;
  }, 0);
}
