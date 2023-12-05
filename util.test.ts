import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { splitRangeWithRange } from './util.ts';

Deno.test('splitRangeWithRange', () => {
  assertEquals(splitRangeWithRange({ from: 1, to: 3 }, { from: 2, to: 4 }), [{
    from: 1,
    to: 1,
  }, { from: 2, to: 3 }]);
  assertEquals(splitRangeWithRange({ from: 2, to: 3 }, { from: 1, to: 4 }), [{
    from: 2,
    to: 3,
  }]);
  assertEquals(splitRangeWithRange({ from: 1, to: 4 }, { from: 2, to: 3 }), [
    { from: 1, to: 1 },
    { from: 2, to: 3 },
    { from: 4, to: 4 },
  ]);
  assertEquals(splitRangeWithRange({ from: 2, to: 4 }, { from: 1, to: 3 }), [
    { from: 2, to: 3 },
    { from: 4, to: 4 },
  ]);
  assertEquals(splitRangeWithRange({ from: 1, to: 2 }, { from: 3, to: 4 }), [{
    from: 1,
    to: 2,
  }]);
  assertEquals(splitRangeWithRange({ from: 3, to: 4 }, { from: 1, to: 2 }), [{
    from: 3,
    to: 4,
  }]);
  assertEquals(splitRangeWithRange({ from: 1, to: 2 }, { from: 1, to: 2 }), [{
    from: 1,
    to: 2,
  }]);
  assertEquals(
    splitRangeWithRange({ from: 1, to: 2 }, { from: 2, to: 3 }),
    [
      {
        from: 1,
        to: 1,
      },
      {
        from: 2,
        to: 2,
      },
    ],
  );
  assertEquals(
    splitRangeWithRange({ from: 2, to: 3 }, { from: 1, to: 2 }),
    [
      {
        from: 2,
        to: 2,
      },
      {
        from: 3,
        to: 3,
      },
    ],
  );
});
