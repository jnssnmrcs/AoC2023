export type Point = {
  x: number;
  y: number;
};

export function getPointsAround(
  point: Point,
  includeDiagonals = false,
): Point[] {
  const { x, y } = point;
  const points = [
    { x, y: y - 1 },
    { x, y: y + 1 },
    { x: x - 1, y },
    { x: x + 1, y },
  ];

  if (includeDiagonals) {
    points.push(
      { x: x - 1, y: y - 1 },
      { x: x + 1, y: y + 1 },
      { x: x - 1, y: y + 1 },
      { x: x + 1, y: y - 1 },
    );
  }

  return points;
}
