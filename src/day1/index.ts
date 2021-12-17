import fs from 'fs';
import path from 'path';

const data = fs
  .readFileSync(path.join(__dirname, 'data'), 'utf-8')
  .split('\n')
  .map((n) => parseInt(n, 10));

const result1 = data.filter(
  (value, index, arr) => value > arr[index - 1]
).length;

console.log(result1);

const result2 = data
  .reduce<number[]>((acc, curr, index, arr) => {
    const sum = curr + arr[index + 1] + arr[index + 2];
    acc.push(sum);
    return acc;
  }, [])
  .filter((value, index, arr) => value > arr[index - 1]).length;

console.log(result2);
