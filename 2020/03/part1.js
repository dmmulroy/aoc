const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const map = input.split('\n').map((row) => row.split(''));

let idx = 0;
let count = 0;
let first = true;

for (let row of map) {
  if (first) {
    first = false;
    continue;
  }

  idx = (idx + 3) % row.length;

  if (row[idx] === '#') {
    count++;
  }
}

console.log(count);
