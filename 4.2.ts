import { intersection } from './util.ts';

export function main(input: string): number {
  const lines = input.split('\n');
  const cardCount = new Map<number, number>();

  return lines.reduce((sum, line) => {
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
}
