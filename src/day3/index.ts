import fs from 'fs';
import path from 'path';

const data = fs.readFileSync(path.join(__dirname, 'data'), 'utf-8').split('\n');
const ROW_LENGTH = data[0].length;

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
  .map((bit) => (bit > data.length / 2 ? '1' : '0'));

const epsilonBinaryArray = gammaBinaryArray.map((bit) =>
  bit === '1' ? '0' : '1'
);

const gammaDecimal = parseInt(gammaBinaryArray.join(''), 2);
const epsilonDecimal = parseInt(epsilonBinaryArray.join(''), 2);
const result1 = gammaDecimal * epsilonDecimal;

console.log(result1);

const splitByBit = (dataSet: string[], index: number) =>
  dataSet.reduce<[string[], string[]]>(
    (acc, curr) => {
      if (curr[index] === '0') {
        acc[0].push(curr);
      } else {
        acc[1].push(curr);
      }
      return acc;
    },
    [[], []]
  );

const getNextDataSet = (
  algoType: 'less' | 'more',
  [zeros, ones]: [string[], string[]]
) => {
  switch (algoType) {
    case 'more':
      return zeros.length === ones.length
        ? ones
        : zeros.length > ones.length
        ? zeros
        : ones;

    case 'less':
      return zeros.length === ones.length
        ? zeros
        : zeros.length > ones.length
        ? ones
        : zeros;
  }
};

const traverse = (
  algoType: 'less' | 'more',
  dataSet: string[],
  index = 0
): string => {
  const [zeros, ones] = splitByBit(dataSet, index);

  if (index === ROW_LENGTH || [...zeros, ...ones].length === 1) {
    return zeros.length > ones.length ? zeros[0] : ones[0];
  }

  return traverse(algoType, getNextDataSet(algoType, [zeros, ones]), index + 1);
};

const o2 = parseInt(traverse('more', data), 2);
const c02 = parseInt(traverse('less', data), 2);

console.log(o2 * c02);
