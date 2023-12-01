const numberMap = new Map([
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
]);

const input = await Deno.readTextFile("day1-input.txt");
const answer = input.split("\n").reduce((sum, line) => {
  const matches = line.matchAll(
    /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
  );
  const numbers: string[] = [];

  for (const [, number] of matches) {
    numbers.push(number);
  }

  if (!numbers.length) {
    return sum;
  }

  const first = numbers[0];
  const last = numbers[numbers.length - 1];
  const value = parseInt(
    (numberMap.get(first) ?? first) + (numberMap.get(last) ?? last)
  );

  return sum + value;
}, 0);

console.log("Day 1 Part 2 answer:", answer);