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
type Card = {
  id: number;
  winningNumbers: number[];
  myNumbers: number[];
};

const cardMap = new Map<number, { card: Card; count: number }>();

for (const line of lines) {
  const matches = line.match(/^Card\s+(\d+)\:([\d\s]+)\|([\d\s]+)$/);

  if (!matches) {
    continue;
  }

  const id = parseInt(matches[1]);
  const winningNumbers = (matches[2].match(/\d+/g) ?? []).map((x) =>
    parseInt(x)
  );
  const myNumbers = (matches[3].match(/\d+/g) ?? []).map((x) => parseInt(x));
  const card = {
    id,
    winningNumbers,
    myNumbers,
  };

  cardMap.set(id, { card, count: 1 });
}
let cardCount = cardMap.size;

for (const [id, { card, count }] of cardMap) {
  const winningNumbers =
    intersection(card.winningNumbers, card.myNumbers).length;

  for (let i = 1; i <= winningNumbers; i++) {
    const old = cardMap.get(id + i);

    if (!old) {
      break;
    }

    cardMap.set(old.card.id, { ...old, count: old.count + count });
    cardCount += count;
  }
}

console.log('Day 4 Part 2 answer:', cardCount);
