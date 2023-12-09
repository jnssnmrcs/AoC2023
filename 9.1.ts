export function createSequences(numbers: number[]) {
  const sequences = [numbers];

  while (!sequences[sequences.length - 1].every((number) => number === 0)) {
    const sequence = sequences[sequences.length - 1] ?? [];
    const nextSequence = [];

    for (let i = 0; i < sequence.length - 1; i++) {
      nextSequence.push(sequence[i + 1] - sequence[i]);
    }

    sequences.push(nextSequence);
  }

  return sequences;
}

export function main(input: string) {
  const lines = input.split(/\r?\n/);

  return lines.reduce((sum, line) => {
    const numbers = line.match(/-?\d+/g)?.map((number) => parseInt(number));

    if (!numbers || !numbers.length) {
      return sum;
    }

    const sequences = createSequences(numbers);

    sequences[sequences.length - 1].push(0);

    for (let i = sequences.length - 1; i > 0; i--) {
      const sequence = sequences[i];
      const previousSequence = sequences[i - 1];
      const newValue = sequence[sequence.length - 1] +
        previousSequence[previousSequence.length - 1];

      previousSequence.push(newValue);
    }

    return sum + numbers[numbers.length - 1];
  }, 0);
}
