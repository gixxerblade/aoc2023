import fs from 'node:fs';
import { resolve } from 'node:path';

const example1 = fs.readFileSync(resolve('example1.txt'), 'utf-8');
const input = fs.readFileSync(resolve('input.txt'), 'utf-8');

const parseInput = (input: string) => {
  let startRow = 0, startCol = 0;
  input
    .split('\n')
    .forEach((line, idx) => {
      if (line.includes('S')) {
        startRow = idx
        startCol = line.split('').findIndex((item) => item === 'S');
      }
    });
    const matrix = input.split('\n');
    return { startRow, startCol, matrix };
}

const charDirection = (currChar: string, nextChar: string) => {
  const canGoUp = 'S|JL'.includes(currChar) && '|7F'.includes(nextChar);
  const canGoDown = 'S|7F'.includes(currChar) && '|JL'.includes(nextChar);
  const canGoLeft = 'S-J7'.includes(currChar) && '-LF'.includes(nextChar);
  const canGoRight = 'S-LF'.includes(currChar) && '-J7'.includes(nextChar);
  return { canGoDown, canGoUp, canGoLeft, canGoRight };
}
 
const puzzle1 = (input: string) => {
  const { startRow, startCol, matrix } = parseInput(input);
  const seen = new Set();
  seen.add(`${startRow}, ${startCol}`);
  const queue: number[][]= [[startRow, startCol]];
  while (queue.length > 0) {
    const [row, col] = queue.shift()!;
    const char = matrix[row][col];
    const { canGoUp } = charDirection(char, matrix[row - 1][col]);
    const { canGoDown } = charDirection(char, matrix[row + 1][col]);
    const { canGoLeft } = charDirection(char, matrix[row][col - 1]);
    const { canGoRight } = charDirection(char, matrix[row][col + 1]);
    // check up
    if (row > 0 && canGoUp && !seen.has(`${row - 1}, ${col}`)) {
      seen.add(`${row - 1}, ${col}`);
      queue.push([row - 1, col]);
    }
    // check down
    if (row < matrix.length - 1 && canGoDown && !seen.has(`${row + 1}, ${col}`)) {
      seen.add(`${row + 1}, ${col}`);
      queue.push([row + 1, col]);
    }
    // check left
    if (col > 0 && canGoLeft && !seen.has(`${row}, ${col - 1}`)) {
      seen.add(`${row}, ${col - 1}`);
      queue.push([row, col - 1]);
    }
    // check right
    if (col < matrix[row].length && canGoRight && !seen.has(`${row}, ${col + 1}`)) {
      seen.add(`${row}, ${col + 1}`);
      queue.push([row, col + 1]);
    }
  }
  return Math.ceil(seen.size) / 2;
};

console.log(puzzle1(input));
const puzzle2 = (input: string) => { };
