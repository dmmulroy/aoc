const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const groups = input.split('\n\n');

const sum = groups.reduce((sum, group) => {
  const answerSets = group.split('\n');
  const answersIntersection = answerSets.reduce((acc, answers, index, arr) => {
    if (arr.length === 1 || index === 0) {
      return [...answers];
    }

    return acc.filter((answer) => answers.includes(answer));
  }, []);
  return (sum += answersIntersection.length);
}, 0);

console.log(sum);
