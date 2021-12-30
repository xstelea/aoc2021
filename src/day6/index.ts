import fs from 'fs';
import path from 'path';

const data = fs
  .readFileSync(path.join(__dirname, 'data'), 'utf-8')
  .split(',')
  .map((n) => parseInt(n, 10));

const spawn = (revolutions: number, initialState: number[]) => {
  let fish: number[] = [...initialState];
  let current = revolutions;

  while (current) {
    const newFish: number[] = [];

    fish = fish.map((item) => {
      const updated = item - 1;
      if (item === 0) {
        newFish.push(8);
        return 6;
      } else {
        return updated;
      }
    });

    fish = fish.concat(newFish);
    --current;
  }
  return fish;
};

const result1 = spawn(18, data).length;
console.log(result1);

const updateState = (state: number[]) => {
  const updatedState = [...state];
  let resets = 0;
  let newItems = 0;

  state.forEach((item, index) => {
    if (index === 0) {
      resets = item;
      newItems = item;
    } else {
      updatedState[index - 1] = item;
    }
  });

  updatedState[6] += resets;
  updatedState[8] = newItems;
  return updatedState;
};

const spawn2 = (revolutions: number, initialState: number[]) => {
  let fishState = new Array(9).fill(0);

  initialState.forEach((item) => {
    ++fishState[item];
  });

  for (let index = 0; index < revolutions; index++) {
    fishState = updateState(fishState);
  }

  return fishState;
};

const result2 = spawn2(256, data).reduce((acc, curr) => acc + curr);

console.log(result2);
