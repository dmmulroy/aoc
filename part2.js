const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const sanitizedInput = input.split('\n').map(Number);

function main() {}

main();
