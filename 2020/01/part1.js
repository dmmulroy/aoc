const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const sanitizedInput = input.split('\n').map(Number);

function main() {
  const seen = new Set();

  for (let num of sanitizedInput) {
    seen.add(num);

    if (seen.has(2020 - num)) {
      console.log(num * (2020 - num));
      continue;
    }
  }
}

main();
