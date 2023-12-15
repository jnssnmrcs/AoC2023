import { hash } from './15.1.ts';

export function main(input: string) {
  const boxes = new Map<number, Map<string, number>>();
  const matches = input.matchAll(/([a-zA-Z]+)(-|=)([0-9])?/g);

  for (const match of matches) {
    const [, label, operation, focalLengthString] = match;
    const focalLength = parseInt(focalLengthString);
    const box = hash(label);

    if (!boxes.has(box)) {
      boxes.set(box, new Map());
    }

    const lensesInBox = boxes.get(box)!;

    if (operation === '-') {
      if (lensesInBox.has(label)) {
        lensesInBox.delete(label);
      }
    } else {
      lensesInBox.set(label, focalLength);
    }
  }

  let focusingPower = 0;

  for (const [boxNumber, box] of boxes) {
    let i = 1;
    for (const focalLength of box.values()) {
      focusingPower += (boxNumber + 1) * i * focalLength;
      i++;
    }
  }

  return focusingPower;
}
