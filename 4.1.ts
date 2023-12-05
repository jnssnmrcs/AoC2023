export function main(input: string): number {
  const lines = input.split('\n');

  return lines.reduce((sum, line) => {
    const parts = line.split(':')[1].split('|');
    const winningNumbers = new Set(parts[0].match(/\d+/g));
    const myNumbers = parts[1].matchAll(/\d+/g);
    let value = 0;

    for (const match of myNumbers) {
      const myNumber = match[0];

      if (winningNumbers.has(myNumber)) {
        if (!value) {
          value = 1;
        } else {
          value *= 2;
        }
      }
    }

    return sum + value;
  }, 0);
}
