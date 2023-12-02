type Game = {
  id: number;
  rounds: {
    draws: {
      count: number;
      color: "red" | "green" | "blue";
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

  for (const round of matches[2].split("; ")) {
    const gameRound: Game["rounds"][0] = {
      draws: [],
    };
    for (const draw of round.split(", ")) {
      const [count, color] = draw.split(" ");

      gameRound.draws.push({
        count: parseInt(count),
        color: color as "red" | "green" | "blue",
      });
    }

    game.rounds.push(gameRound);
  }

  return game;
}

const cubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const input = await Deno.readTextFile("day2-input.txt");
const lines = input.split("\n");
// Part 1
let answer = lines.reduce((sum, line) => {
  const game = parseGame(line);
  const possible = game?.rounds.every((round) =>
    round.draws.every((draw) => draw.count <= cubes[draw.color])
  );

  return !game || !possible ? sum : sum + game.id;
}, 0);

console.log("Day 2 Part 1 answer:", answer);

// Part 2
answer = lines.reduce((sum, line) => {
  const game = parseGame(line);

  if (!game) {
    return sum;
  }

  const maxCounts: Record<"red" | "green" | "blue", number> = {
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

console.log("Day 2 Part 2 answer:", answer);
