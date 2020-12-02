const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const entries = input.split('\n').map((entry) => {
  const [minMax, untrimmedLetter, password] = entry.split(' ');
  const [min, max] = minMax.split('-');
  const letter = untrimmedLetter.replace(':', '');

  return {
    letter,
    firstIdx: Number(min) - 1,
    secondIdx: Number(max) - 1,
    password,
  };
});

const numValidPasswords = entries.reduce(
  (count, { letter, firstIdx, secondIdx, password }) => {
    const firstLetter = password[firstIdx];
    const secondLetter = password[secondIdx];

    if (firstLetter === letter || secondLetter === letter) {
      if (firstLetter === secondLetter) {
        return count;
      }

      return ++count;
    }

    return count;
  },
  0
);

console.log(numValidPasswords);
