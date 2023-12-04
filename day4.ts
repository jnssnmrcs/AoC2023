import { intersection } from './util.ts';

const input = await Deno.readTextFile('day4-input.txt');
const lines = input.split('\n');

// Part 1
const answer1 = lines.reduce((sum, line) => {
  const parts = line.split(':')[1].split('|');
  const winningNumbers = new Set(parts[0].match(/\d+/g));
  const myNumbers = parts[1].matchAll(/\d+/g);
  let value = 0;

  for (const match of myNumbers) {
    const myNumber = match[0];

    if (winningNumbers.has(myNumber)) {
      if (!value) {
        value = 1;
      } else {
        value *= 2;
      }
    }
  }

  return sum + value;
}, 0);

console.log('Day 4 Part 1 answer:', answer1);

// Part 2
const cardCount = new Map<number, number>();
const answer2 = lines.reduce((sum, line) => {
  const matches = line.match(/^Card\s+(\d+)\:([\d\s]+)\|([\d\s]+)$/);

  if (!matches) {
    return sum;
  }

  const id = parseInt(matches[1]);
  const winningNumbers = matches[2].match(/\d+/g) ?? [];
  const myNumbers = matches[3].match(/\d+/g) ?? [];
  const count = cardCount.get(id) ?? 1;
  const winCount = intersection(winningNumbers, myNumbers).length;

  for (let i = 1; i <= winCount; i++) {
    const oldCount = cardCount.get(id + i) ?? 1;

    cardCount.set(id + i, oldCount + count);
  }

  return sum + count;
}, 0);

console.log('Day 4 Part 2 answer:', answer2);
