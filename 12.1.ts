import { unique } from './util.ts';

function howManyFits(group: string): [min: number, max: number] {
  const min = 0;
  const max = 0;

  return [min, max];
}

function howManyGroupsPossible(group: string): number {
  return group.length === 1 ? 1 : 2 * howManyGroupsPossible(group.substring(1));
}

function getCombinations(groups: string[], counts: number[]) {
  return 0;
}

function getGroupCombinations(group: string): string[] {
  const firstUnknownIndex = group.indexOf('?');

  if (firstUnknownIndex === -1) {
    return [group];
  }

  if (group.length === 1) {
    return ['.', '#'];
  }

  const first = group.substring(0, firstUnknownIndex);
  const rest = group.substring(firstUnknownIndex + 1);
  const restCombinations = getGroupCombinations(rest);
  const combinations = [
    ...restCombinations.map((combination) => first + '.' + combination),
    ...restCombinations.map((combination) => first + '#' + combination),
  ];

  return combinations;
}

function placeOrFindInGroup(length: number, group: string) {
}

function getGroupCounts(group: string) {
  const counts: Record<number, number> = {};
  const combinations = getGroupCombinations(group);

  for (let i = 0; i < group.length; i++) {
    const length = i + 1;
    counts[length] = combinations.filter((combination) =>
      (combination.match(/#/g)?.length ?? 0) === length
    ).length;
  }

  return counts;
}

function unfoldLine(line: string) {
  const [springs, counts] = line.split(' ');

  return Array(5).fill(springs).join('?') + ' ' +
    Array(5).fill(counts).join(',');
}

function countCombinations(
  counts: number[],
  line: string,
  totalLength: number,
  result = '',
): string[] {
  const [length, ...rest] = counts;

  if (length === undefined) {
    return /#/.test(line) ? [] : [
      result.substring(0, result.length - 1).replaceAll('?', '.').padEnd(
        totalLength,
        '.',
      ),
    ];
  }

  if (length > line.length) {
    return [];
  }

  const combinations: string[] = [];
  const to = line.length - length;

  for (let i = 0; i <= to; i++) {
    const sub = line.substring(i, i + length);
    const mathingChars = /^(\?|#)+$/.test(sub);
    const beforeOk = i === 0 || line[i - 1] !== '#';
    const afterOk = i + length === line.length || line[i + length] !== '#';
    const noneSkipped = !/#/.test(line.substring(0, i));

    if (
      noneSkipped &&
      mathingChars &&
      beforeOk &&
      afterOk
    ) {
      // console.log(counts, line.substring(sub.length + 1));
      combinations.push(...countCombinations(
        rest,
        line.substring(i + sub.length + 1),
        totalLength,
        result + line.substring(0, i) + '#'.repeat(length) + '.',
      ));
    }
  }

  return combinations;
}

function validate(line: string, counts: number[], combinations: string[]) {
  const invalidCombinations: string[] = [];

  for (const combination of combinations) {
    for (let i = 0; i < combination.length; i++) {
      if (combination[i] !== line[i] && line[i] !== '?') {
        invalidCombinations.push(combination);
      }
    }

    const groups = combination.split(/\.+/g).filter((group) => !!group);

    for (let j = 0; j < groups.length; j++) {
      if (groups[j].length !== counts[j]) {
        invalidCombinations.push(combination);
      }
    }
  }

  return invalidCombinations;
}

export function main(input: string) {
  const lines = input.split(/\r?\n/);

  return lines.reduce((sum, line) => {
    // console.log(unfoldLine(line));
    const [springs, counts] = line.split(' ');
    const springCounts = counts.split(',').map((number) => parseInt(number));
    const combinations = unique(countCombinations(
      springCounts,
      springs,
      springs.length,
    ));
    const invalid = validate(springs, springCounts, combinations);

    if (invalid.length) {
      console.log(springs, counts, combinations.length);

      for (const inv of invalid) {
        console.log(inv);
      }
    }

    return sum + combinations.length;
  }, 0);
}
