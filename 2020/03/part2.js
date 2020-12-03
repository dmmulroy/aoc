const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const map = input.split('\n').map((row) => row.split(''));

const slopes = [
  // [run, rise, treeCount]
  [1, 1, 0],
  [3, 1, 0],
  [5, 1, 0],
  [7, 1, 0],
  [1, 2, 0],
];

for (let rowIdx = 1; rowIdx < map.length; rowIdx++) {
  const row = map[rowIdx];

  slopes.forEach((slope) => {
    if (slope[1] === 1 || rowIdx % slope[1] === 0) {
      const columnIdx = (rowIdx / (slope[1] / slope[0])) % row.length;

      if (row[columnIdx] === '#') {
        slope[2]++;
      }
    }
  });
}

const product = slopes.reduce((value, [, , treeCount]) => {
  if (treeCount === 0) {
    return value;
  }

  return treeCount * value;
}, 1);

console.log(product);
