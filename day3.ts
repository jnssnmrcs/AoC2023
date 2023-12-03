import { getPointsAround, Point } from './point.ts';

const input = await Deno.readTextFile('day3-input.txt');
const lines = input.split('\n');

// Part 1
const answer1 = lines.reduce((sum, line, y) => {
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

console.log('Day 3 Part 1 answer:', answer1);

// Part 2
type Part = {
  value: number;
  start: Point;
  end: Point;
};

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

const answer2 = lines.reduce((sum, line, y) => {
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

console.log('Day 3 Part 2 answer:', answer2);
