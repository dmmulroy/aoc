const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const sanitizedInput = input.split('\n').map(Number);

function main() {
  const seen = new Set();
  let found = false;

  for (let i = 0; i < sanitizedInput.length; i++) {
    const sum = 2020 - sanitizedInput[i];

    for (let num of sanitizedInput) {
      seen.add(num);

      if (seen.has(sum - num)) {
        found = true;
        console.log(sanitizedInput[i] * num * (sum - num));
        break;
      }
    }

    if (found) {
      break;
    }
  }
}

main();
