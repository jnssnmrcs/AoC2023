import { parseInput } from './8.1.ts';
import { combinations, lcm } from './util.ts';

export function main(input: string) {
  const [instructions, nodes] = parseInput(input);
  const positions = Object.keys(nodes).filter((node) => node[2] === 'A');
  const counts = new Map<string, number[]>();

  // Find count of all possible ways to get from each start position to an end position
  for (const start of positions) {
    const visited = new Map<string, Set<number>>();
    let current = start;
    let instruction = 0;
    let count = 1;

    while (true) {
      current = nodes[current][instructions[instruction]];

      if (current[2] === 'Z') {
        const old = visited.get(current) ?? new Set();
        const newSet = new Set(old);
        counts.set(start, [...(counts.get(start) || []), count]);

        if (old.has(instruction)) {
          // Cycle found, been here before
          break;
        } else {
          newSet.add(instruction);
          visited.set(current, newSet);
        }
      }

      count++;
      instruction++;

      if (instruction === instructions.length) {
        instruction = 0;
      }
    }
  }

  // Find the combination of counts with the lowest least common multiple
  let min = Infinity;

  for (const combination of combinations([...counts.values()])) {
    const least = lcm(...combination);

    if (least < min) {
      min = least;
    }
  }

  return min;
}
