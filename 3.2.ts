import { getPointsAround, Point } from './util.ts';

type Part = {
  value: number;
  start: Point;
  end: Point;
};

export function main(input: string): number {
  const lines = input.split('\n');

  const parts = lines.reduce<Part[]>((previous, line, y) => {
    const matches = line.matchAll(/\d+/g);

    for (const match of matches) {
      if (match.index === undefined) {
        continue;
      }

      const number = match[0];

      previous.push({
        value: parseInt(number),
        end: {
          x: match.index + number.length - 1,
          y,
        },
        start: {
          x: match.index,
          y,
        },
      });
    }

    return previous;
  }, []);

  return lines.reduce((sum, line, y) => {
    const matches = line.matchAll(/\*/g);
    let lineSum = 0;

    for (const match of matches) {
      if (match.index === undefined) {
        continue;
      }

      const x = match.index;
      const pointsAround = getPointsAround({ x, y }, true);
      const firstPart = parts.find((part) =>
        pointsAround.some((point) =>
          part.start.y === point.y && point.x >= part.start.x &&
          point.x <= part.end.x
        )
      );

      if (!firstPart) {
        continue;
      }

      const secondPart = parts.find((part) =>
        pointsAround.some((point) =>
          part.start.y === point.y && point.x >= part.start.x &&
          point.x <= part.end.x &&
          (part.start.x !== firstPart.start.x ||
            part.start.y !== firstPart.start.y)
        )
      );

      if (secondPart) {
        lineSum += firstPart.value * secondPart.value;
      }
    }

    return sum + lineSum;
  }, 0);
}
