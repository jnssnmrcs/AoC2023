function parseInput(input: string): [number, number] | undefined {
  const [time, record] = input.split(/\n/g);
  const times = time.match(/\d+/g)?.join('');
  const records = record.match(/\d+/g)?.join('');

  if (!times || !records) {
    return;
  }

  return [parseInt(times), parseInt(records)];
}

export function main(input: string) {
  const data = parseInput(input);

  if (!data) {
    return -1;
  }

  const [time, record] = data;
  let recordBeat = 0;

  for (let i = 1; i < time; i++) {
    const distance = (time - i) * i;

    if (distance > record) {
      recordBeat++;
    }
  }

  return recordBeat;
}
