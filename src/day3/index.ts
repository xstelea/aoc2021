import fs from 'fs';
import path from 'path';

const data = fs.readFileSync(path.join(__dirname, 'data'), 'utf-8').split('\n');

const gammaBinaryArray = data
  .reduce<number[]>((acc, cur) => {
    const bits = cur.split('');
    for (const [index, bit] of bits.entries()) {
      if (bit === '1') {
        acc[index] = (acc[index] || 0) + 1;
      }
    }
    return acc;
  }, [])
  .map((bit) => (bit > 500 ? '1' : '0'));

const epsilonBinaryArray = gammaBinaryArray.map((bit) =>
  bit === '1' ? '0' : '1'
);

const gammaDecimal = parseInt(gammaBinaryArray.join(''), 2);
const epsilonDecimal = parseInt(epsilonBinaryArray.join(''), 2);
const result1 = gammaDecimal * epsilonDecimal;

console.log(result1);
