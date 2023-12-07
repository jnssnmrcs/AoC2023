import { handComparator, HandType, parseInput } from './7.1.ts';

const CARD_VALUE: Record<string, number> = {
  T: 10,
  J: 1,
  Q: 12,
  K: 13,
  A: 14,
};

function getHandType(cards: string): HandType {
  const cardToCount: Map<string, number> = new Map();
  const countToCard: Map<number, string[]> = new Map();

  for (let i = 0; i < cards.length; i++) {
    const old = cardToCount.get(cards[i]) || 0;
    cardToCount.set(cards[i], old + 1);
  }

  for (const [card, count] of cardToCount) {
    const old = countToCard.get(count) || [];
    countToCard.set(count, [...old, card]);
  }

  if (
    countToCard.get(5) || // XXXXX
    (countToCard.get(4) && cardToCount.get('J') === 1) || // XXXXJ
    (countToCard.get(3) && cardToCount.get('J') === 2) || // XXXJJ
    (countToCard.get(2) && cardToCount.get('J') === 3) || // XXJJJ
    (cardToCount.get('J') === 4) // XJJJJ
  ) {
    return 'five of a kind';
  }

  if (
    countToCard.get(4) || // XXXXY
    (countToCard.get(3) && cardToCount.get('J') === 1) || // XXXYJ
    (countToCard.get(2)?.length === 2 && cardToCount.get('J') === 2) || // XXYJJ
    (cardToCount.get('J') === 3) // XYJJJ
  ) {
    return 'four of a kind';
  }

  if (
    (countToCard.get(3) && countToCard.get(2)) || // XXXYY
    (countToCard.get(2)?.length === 2 && cardToCount.get('J') === 1) || // XXYYJ
    (countToCard.get(2)?.length === 2 && cardToCount.get('J') === 2) // XXYJJ
  ) {
    return 'full house';
  }

  if (
    countToCard.get(3) || // XXXYZ
    (countToCard.get(2) && cardToCount.get('J') === 1) || // XXYZJ
    cardToCount.get('J') === 2 // XYZJJ
  ) {
    return 'three of a kind';
  }

  if (
    countToCard.get(2)?.length === 2 || // XXYYZ
    (countToCard.get(2) && cardToCount.get('J') === 1) // XXYZJ
  ) {
    return 'two pair';
  }

  if (
    countToCard.get(2) || // XXYZW
    cardToCount.get('J') === 1 // XYZWJ
  ) {
    return 'one pair';
  }

  return 'high card';
}

export function main(input: string) {
  const hands = parseInput(input);
  const winnings = hands.toSorted(handComparator(CARD_VALUE, getHandType))
    .reduce((sum, { bid }, index) => {
      return sum + (index + 1) * bid;
    }, 0);

  return winnings;
}
