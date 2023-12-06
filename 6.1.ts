function parseInput(input: string): [number, number][] {
  const data: [number, number][] = [];
  const [time, record] = input.split(/\n/g);
  const times = time.match(/\d+/g);
  const records = record.match(/\d+/g);

  if (!times || !records) {
    return data;
  }

  for (let i = 0; i < times.length; i++) {
    data.push([parseInt(times[i]), parseInt(records[i])]);
  }

  return data;
}

export function main(input: string) {
  const data = parseInput(input);

  const recordsBeat = data.reduce((total, [time, record]) => {
    let count = 0;

    for (let i = 1; i < time; i++) {
      const distance = (time - i) * i;

      if (distance > record) {
        count++;
      }
    }

    return count * total;
  }, 1);

  return recordsBeat;
}
