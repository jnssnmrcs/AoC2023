export function hash(data: string): number {
  let value = 0;

  for (const character of data) {
    value += character.charCodeAt(0);
    value *= 17;
    value %= 256;
  }

  return value;
}

export function main(input: string) {
  return input.split(',').reduce((sum, step) => {
    return sum + hash(step);
  }, 0);
}
