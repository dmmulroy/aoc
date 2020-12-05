const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const passports = input.split(/\n\n/gm).map((rawPassport) =>
  rawPassport.split(/\s/gm).reduce((prev, curr) => {
    const [key, value] = curr.split(':');

    prev[key] = value;

    return prev;
  }, {})
);

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const validPassports = passports.reduce((sum, passport) => {
  const numKeys = Object.keys(passport).length;

  if (
    numKeys === 8 ||
    (numKeys === 7 && requiredFields.every((field) => field in passport))
  ) {
    return ++sum;
  }

  return sum;
}, 0);

console.log(validPassports);
