const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const entries = input.split('\n').map((entry) => {
  const [minMax, untrimmedLetter, password] = entry.split(' ');
  const [min, max] = minMax.split('-');
  const letter = untrimmedLetter.replace(':', '');

  return {
    letter,
    min: Number(min),
    max: Number(max),
    password,
  };
});

const numValidPasswords = entries.reduce(
  (validCount, { letter, min, max, password }) => {
    let count = 0;

    for (let char of password) {
      if (char === letter) count++;
    }

    if (count < min || count > max) {
      return validCount;
    }

    return ++validCount;
  },
  0
);

console.log(numValidPasswords);
