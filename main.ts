const day = Deno.args[0];
const input = await Deno.readTextFile(day + '.txt');
const part1: { main: (input: string) => number } = await import(
  `./${day}.1.ts`
);
const part2: { main: (input: string) => number } = await import(
  `./${day}.2.ts`
);

// Part 1
const start1 = performance.now();
const answer1 = part1.main(input);
const duration1 = (performance.now() - start1).toFixed(1);

console.log(`Day ${day} part 1 answer (${duration1} ms): ${answer1}`);

// Part 2
const start2 = performance.now();
const answer2 = part2.main(input);
const duration2 = (performance.now() - start2).toFixed(1);

console.log(`Day ${day} part 2 answer (${duration2} ms): ${answer2}`);
