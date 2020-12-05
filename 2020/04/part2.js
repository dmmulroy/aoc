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

const validations = {
  byr: (value) => {
    const num = Number(value);
    if (Number.isNaN(num)) {
      return false;
    }

    return num >= 1920 && num <= 2020;
  },
  iyr: (value) => {
    const num = Number(value);
    if (Number.isNaN(num)) {
      return false;
    }

    return num >= 2010 && num <= 2020;
  },
  eyr: (value) => {
    const num = Number(value);
    if (Number.isNaN(num)) {
      return false;
    }

    return num >= 2020 && num <= 2030;
  },
  hgt: (value) => {
    const [strNum, unit] = value.split(/(cm|in)/);
    const num = Number(strNum);

    if (Number.isNaN(num)) {
      return false;
    }

    if (unit === 'cm') {
      return num >= 150 && num <= 193;
    }

    if (unit === 'in') {
      return num >= 59 && num <= 76;
    }

    return false;
  },
  hcl: (value) => Boolean(value.match(/^#[a-f0-9]{6}$/)),
  ecl: (value) =>
    ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(
      (color) => color === value
    ),
  pid: (value) => Boolean(value.match(/^\d{9}$/)),
};

const validPassports = passports.reduce((sum, passport) => {
  const numKeys = Object.keys(passport).length;

  if (numKeys < 7) {
    return sum;
  }

  const valid = Object.entries(validations).every(([key, validateFn]) => {
    if (!passport[key]) {
      return false;
    }

    return validateFn(passport[key]);
  });

  return valid ? ++sum : sum;
}, 0);

console.log(validPassports);
