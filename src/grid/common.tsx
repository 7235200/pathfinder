export const chordsToId = (x: number, y: number) => `${x},${y}`;

const defaultRem = 16;
export const getPosition = (
  x: number,
  y: number,
  rem: number = defaultRem
) => ({ top: y * rem, left: x * rem });
