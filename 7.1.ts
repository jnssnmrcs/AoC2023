export type Hand = {
  cards: string;
  bid: number;
};

export type HandType =
  | 'full house'
  | 'four of a kind'
  | 'five of a kind'
  | 'three of a kind'
  | 'two pair'
  | 'one pair'
  | 'high card';

export const HAND_VALUE: Record<HandType, number> = {
  'five of a kind': 7,
  'four of a kind': 6,
  'full house': 5,
  'three of a kind': 4,
  'two pair': 3,
  'one pair': 2,
  'high card': 1,
};

const CARD_VALUE: Record<string, number> = {
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

export function parseInput(input: string) {
  const lines = input.split('\n');

  return lines.map<Hand>((line) => {
    const [cards, bid] = line.split(' ');

    return {
      cards,
      bid: parseInt(bid),
    };
  });
}

function getHandType(cards: string): HandType {
  const cardCount: Record<string, number> = {};

  for (let i = 0; i < 5; i++) {
    cardCount[cards[i]] = (cardCount[cards[i]] || 0) + 1;
  }

  if (Object.values(cardCount).find((count) => count === 5)) {
    return 'five of a kind';
  }

  if (Object.values(cardCount).find((count) => count === 4)) {
    return 'four of a kind';
  }

  const threeEntry = Object.entries(cardCount).find(([, count]) => count === 3);
  const three = threeEntry?.[0];

  if (three) {
    const two = Object.entries(cardCount).find(([card, count]) =>
      card !== three && count === 2
    );

    if (two) {
      return 'full house';
    } else {
      return 'three of a kind';
    }
  }

  const twoEntry = Object.entries(cardCount).find(([, count]) => count === 2);
  const two = twoEntry?.[0];

  if (
    two &&
    Object.entries(cardCount).find(([card, count]) =>
      card !== two && count === 2
    )
  ) {
    return 'two pair';
  }

  if (Object.values(cardCount).find((count) => count === 2)) {
    return 'one pair';
  }

  return 'high card';
}

export function handComparator(
  cardValues: Record<string, number>,
  handType: (cards: string) => HandType,
) {
  return (a: Hand, b: Hand) => {
    const diff = HAND_VALUE[handType(a.cards)] -
      HAND_VALUE[handType(b.cards)];

    if (diff !== 0) {
      return diff;
    }

    for (let i = 0; i < 5; i++) {
      const aCard = a.cards[i];
      const bCard = b.cards[i];

      if (aCard !== bCard) {
        const aCardValue = cardValues[aCard] ?? parseInt(aCard);
        const bCardValue = cardValues[bCard] ?? parseInt(bCard);

        return aCardValue - bCardValue;
      }
    }

    return 0;
  };
}

export function main(input: string) {
  const hands = parseInput(input);
  const winnings = hands.toSorted(handComparator(CARD_VALUE, getHandType))
    .reduce((sum, { bid }, index) => {
      return sum + (index + 1) * bid;
    }, 0);

  return winnings;
}
