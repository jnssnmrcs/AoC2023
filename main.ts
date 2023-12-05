import { main as _1_1 } from './1.1.ts';
import { main as _1_2 } from './1.2.ts';
import { main as _2_1 } from './2.1.ts';
import { main as _2_2 } from './2.2.ts';
import { main as _3_1 } from './3.1.ts';
import { main as _3_2 } from './3.2.ts';
import { main as _4_1 } from './4.1.ts';
import { main as _4_2 } from './4.2.ts';
import { main as _5_1 } from './5.1.ts';
import { main as _5_2 } from './5.2.ts';

const solutions: Record<
  string,
  { 1: (input: string) => number; 2: (input: string) => number }
> = {
  1: {
    1: _1_1,
    2: _1_2,
  },
  2: {
    1: _2_1,
    2: _2_2,
  },
  3: {
    1: _3_1,
    2: _3_2,
  },
  4: {
    1: _4_1,
    2: _4_2,
  },
  5: {
    1: _5_1,
    2: _5_2,
  },
};

const day = Deno.args[0];
const input = await Deno.readTextFile(day + '.txt');

// Part 1
const start1 = performance.now();
const answer1 = solutions[day][1](input);
const duration1 = (performance.now() - start1).toFixed(1);

console.log(`Day ${day} part 1 answer (${duration1} ms): ${answer1}`);

// Part 2
const start2 = performance.now();
const answer2 = solutions[day][2](input);
const duration2 = (performance.now() - start2).toFixed(1);

console.log(`Day ${day} part 2 answer (${duration2} ms): ${answer2}`);
