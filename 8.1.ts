type Node = {
  L: string;
  R: string;
};

export function parseInput(
  input: string,
): [Array<'L' | 'R'>, Record<string, Node>] {
  const lines = input.split(/\r?\n/);
  const directions = lines.shift()!.split('') as Array<'L' | 'R'>;

  lines.shift();

  const nodes = lines.reduce<Record<string, Node>>((nodes, line) => {
    const matches = line.match(
      /([A-Z0-9]{3})\s=\s\(([A-Z0-9]{3}),\s([A-Z0-9]{3})\)/,
    );

    if (!matches) {
      return nodes;
    }

    const [, source, L, R] = matches;

    nodes[source] = { L, R };

    return nodes;
  }, {});

  return [directions, nodes];
}

export function main(input: string) {
  const [directions, nodes] = parseInput(input);
  let position = 'AAA';
  let direction = 0;
  let count = 0;

  while (position !== 'ZZZ') {
    position = nodes[position][directions[direction]];

    count++;
    direction++;

    if (direction === directions.length) {
      direction = 0;
    }
  }

  return count;
}
