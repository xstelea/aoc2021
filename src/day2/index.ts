import fs from 'fs';
import path from 'path';

const data = fs
  .readFileSync(path.join(__dirname, 'data'), 'utf-8')
  .split('\n')
  .map<[string, number]>((row) => {
    const [command, value] = row.split(' ');
    return [command, parseInt(value, 10)];
  });

const result1 = data.reduce<[number, number]>(
  (acc, [command, value]) => {
    const [x, y] = acc;

    switch (command) {
      case 'forward':
        return [x + value, y];

      case 'up':
        return [x, y - value];

      case 'down':
        return [x, y + value];

      default:
        return [x, y];
    }
  },
  [0, 0]
);

console.log(result1[0] * result1[1]);

const result2 = data.reduce<[number, number, number]>(
  (acc, [command, value]) => {
    const [x, y, z] = acc;

    switch (command) {
      case 'forward':
        return [x + value, y, z + value * y];

      case 'up':
        return [x, y - value, z];

      case 'down':
        return [x, y + value, z];

      default:
        return [x, y, z];
    }
  },
  [0, 0, 0]
);

console.log(result2[0] * result2[2]);
