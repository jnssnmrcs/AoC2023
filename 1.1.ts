export function main(input: string): number {
  const lines = input.split('\n');

  return lines.reduce((sum, line) => {
    const numbers = line.match(/\d/g);

    if (!numbers || !numbers.length) {
      return sum;
    }

    const value = parseInt(numbers[0] + numbers[numbers.length - 1]);

    return sum + value;
  }, 0);
}
