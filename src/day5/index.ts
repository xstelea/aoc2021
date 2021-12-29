import fs from 'fs';
import path from 'path';

const data = fs
  .readFileSync(path.join(__dirname, 'data'), 'utf-8')
  .split('\n')
  .map((item) =>
    item
      .split(' -> ')
      .map((vectors) => vectors.split(',').map((point) => parseInt(point, 10)))
      .flatMap((item) => item)
  );

const extrapolate = ([x1, y1, x2, y2]: [number, number, number, number]) => {
  const xStep = x1 === x2 ? 0 : x1 > x2 ? -1 : 1;
  const xSteps = Math.abs(x1 - x2);

  const yStep = y1 === y2 ? 0 : y1 > y2 ? -1 : 1;
  const ySteps = Math.abs(y1 - y2);

  let steps = Math.max(xSteps, ySteps) + 1;

  const arr = [];

  let xValue = x1;
  let yValue = y1;

  while (steps--) {
    arr.push(`${xValue},${yValue}`);
    xValue += xStep;
    yValue += yStep;
  }
  return arr;
};

const result1 = [
  ...data
    .filter(([x1, y1, x2, y2]) => x1 === x2 || y1 === y2)
    .map(([x1, y1, x2, y2]) => extrapolate([x1, y1, x2, y2]))
    .reduce((coords, keys) => {
      keys.forEach((key) => coords.set(key, (coords.get(key) || 0) + 1));
      return coords;
    }, new Map<string, number>())
    .values(),
].filter((value) => value > 1).length;

console.log(result1);

const result2 = [
  ...data
    .map(([x1, y1, x2, y2]) => extrapolate([x1, y1, x2, y2]))
    .reduce((coords, keys) => {
      keys.forEach((key) => coords.set(key, (coords.get(key) || 0) + 1));
      return coords;
    }, new Map<string, number>())
    .values(),
].filter((value) => value > 1).length;

console.log(result2);
