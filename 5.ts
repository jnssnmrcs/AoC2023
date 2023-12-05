import { main as _5_1 } from './5.1.ts';
import { main as _5_2 } from './5.2.ts';

const input = await Deno.readTextFile('5.txt');

const start1 = performance.now();
const answer1 = _5_1(input);
const duration1 = (performance.now() - start1).toFixed(1);

console.log(`Day 5 part 1 answer (${duration1} ms): ${answer1}`);

const start2 = performance.now();
const answer2 = _5_2(input);
const duration2 = (performance.now() - start2).toFixed(1);

console.log(`Day 5 part 2 answer (${duration2} ms): ${answer2}`);
