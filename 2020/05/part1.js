const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const boardingPasses = input.split('\n');

const highestBoardingPassId = boardingPasses.reduce(
  (highestId, boardingPass) => {
    const rows = boardingPass.slice(0, 7).split('');
    const seats = boardingPass.slice(7).split('');
    let row;
    let rowLowerBound = 0;
    let rowUpperBound = 127;
    let seat;
    let seatLowerBound = 0;
    let seatUpperBound = 7;

    for (let [index, rowPartition] of rows.entries()) {
      if (index === rows.length - 1) {
        row = rowPartition === 'F' ? rowLowerBound : rowUpperBound;
        break;
      }

      if (rowPartition === 'F') {
        rowUpperBound = Math.floor((rowLowerBound + rowUpperBound) / 2);
      }

      if (rowPartition === 'B') {
        rowLowerBound = Math.ceil((rowLowerBound + rowUpperBound) / 2);
      }
    }

    for (let [index, seatPartition] of seats.entries()) {
      if (index === seats.length - 1) {
        seat = seatPartition === 'L' ? seatLowerBound : seatUpperBound;
        break;
      }

      if (seatPartition === 'L') {
        seatUpperBound = Math.floor((seatLowerBound + seatUpperBound) / 2);
      }

      if (seatPartition === 'R') {
        seatLowerBound = Math.ceil((seatLowerBound + seatUpperBound) / 2);
      }
    }
    const id = row * 8 + seat;

    return id > highestId ? id : highestId;
  },
  0
);

console.log(highestBoardingPassId);
