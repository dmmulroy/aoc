const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const entries = input.split('\n').map((entry) => {
  const [indexes, untrimmedLetter, password] = entry.split(' ');
  const [firstIndex, secondIndex] = indexes.split('-');
  const letter = untrimmedLetter.replace(':', '');

  return {
    letter,
    firstIndex: Number(firstIndex) - 1,
    secondIndex: Number(secondIndex) - 1,
    password,
  };
});

const numValidPasswords = entries.reduce(
  (count, { letter, firstIndex, secondIndex, password }) => {
    const firstLetter = password[firstIndex];
    const secondLetter = password[secondIndex];

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
