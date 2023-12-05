type Game = {
  id: number;
  rounds: {
    draws: {
      count: number;
      color: 'red' | 'green' | 'blue';
    }[];
  }[];
};

export function parseGame(line: string): Game | null {
  const matches = line.match(/^Game\s(\d+):\s(.*)/);

  if (!matches) {
    return null;
  }

  const game: Game = {
    id: parseInt(matches[1]),
    rounds: [],
  };

  for (const round of matches[2].split('; ')) {
    const gameRound: Game['rounds'][0] = {
      draws: [],
    };
    for (const draw of round.split(', ')) {
      const [count, color] = draw.split(' ');

      gameRound.draws.push({
        count: parseInt(count),
        color: color as 'red' | 'green' | 'blue',
      });
    }

    game.rounds.push(gameRound);
  }

  return game;
}

export function main(input: string): number {
  const lines = input.split('\n');
  const cubes = {
    red: 12,
    green: 13,
    blue: 14,
  };

  return lines.reduce((sum, line) => {
    const game = parseGame(line);
    const possible = game?.rounds.every((round) =>
      round.draws.every((draw) => draw.count <= cubes[draw.color])
    );

    return !game || !possible ? sum : sum + game.id;
  }, 0);
}
