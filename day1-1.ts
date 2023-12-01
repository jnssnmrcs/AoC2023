const input = await Deno.readTextFile("day1-input.txt");
const answer = input.split("\n").reduce((sum, line) => {
  const numbers = line.match(/\d/g);

  if (!numbers?.length) {
    return sum;
  }

  const value = parseInt(numbers[0] + numbers[numbers.length - 1]);

  return sum + value;
}, 0);

console.log("Day 1 Part 1 answer:", answer);
