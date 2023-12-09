import fs from 'node:fs';
import { resolve } from 'node:path';

const example1 = fs.readFileSync(resolve('example1.txt'), 'utf-8');
const input = fs.readFileSync(resolve('input.txt'), 'utf-8');

const parseInput = (input: string) => {
  return input
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => line.split(' ').map(Number))
}

const findNextNum = (arr: number[]) => {
  const res: number[] = [];
  res.push(arr[arr.length - 1]);
  while (!arr.every((num) => num === 0)) {
    arr = arr.slice(1).map((num, idx) => num - arr[idx]);
    res.push(arr[arr.length - 1]);
  }
  return res.reduce((a, b) => a + b);
}


const puzzle1 = (input: string) => {
  const lines = parseInput(input);
  const ans: Array<number> = [];
  lines.forEach((line) => {
    ans.push(findNextNum(line))
  })
  return ans.reduce((a, b) => a + b)
};

const findPrevNum = (arr: number[]): number => {
  if (arr.every((num) => num === 0)) {
    return 0;
  }
  const deltas = arr.slice(0, -1).map((num, idx) => arr[idx + 1] - num);
  const difference = findPrevNum(deltas);
  return arr[0] - difference;
}

console.log(puzzle1(input))
const test = '0 3 6 9 12 15'.split(' ').map(Number);
console.log(findPrevNum(test))
const puzzle2 = (input: string) => {
  const lines = parseInput(input);
  const ans: number[] = [];
  lines.forEach((line) => {
    ans.push(findPrevNum(line))
  });
  return ans.reduce((a, b) => a + b)
};

console.log(puzzle2(input))
