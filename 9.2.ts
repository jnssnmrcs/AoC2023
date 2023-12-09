import { createSequences } from './9.1.ts';

export function main(input: string) {
  const lines = input.split(/\r?\n/);

  return lines.reduce((sum, line) => {
    const numbers = line.match(/-?\d+/g)?.map((number) => parseInt(number));

    if (!numbers || !numbers.length) {
      return sum;
    }

    const sequences = createSequences(numbers);

    sequences[sequences.length - 1].unshift(0);

    for (let i = sequences.length - 1; i > 0; i--) {
      const sequence = sequences[i];
      const previousSequence = sequences[i - 1];
      const newValue = previousSequence[0] - sequence[0];

      previousSequence.unshift(newValue);
    }

    return sum + numbers[0];
  }, 0);
}
