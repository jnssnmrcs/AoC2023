import { parseGame } from './2.1.ts';

export function main(input: string): number {
  const lines = input.split('\n');

  return lines.reduce((sum, line) => {
    const game = parseGame(line);

    if (!game) {
      return sum;
    }

    const maxCounts: Record<'red' | 'green' | 'blue', number> = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const round of game.rounds) {
      for (const draw of round.draws) {
        if (draw.count > maxCounts[draw.color]) {
          maxCounts[draw.color] = draw.count;
        }
      }
    }

    const power = maxCounts.red * maxCounts.green * maxCounts.blue;

    return sum + power;
  }, 0);
}
