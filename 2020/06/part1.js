const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const groups = input.split('\n\n');

const sum = groups.reduce((sum, group) => {
  return (sum += new Set([...group.replace(/\n/gm, '')]).size);
}, 0);

console.log(sum);
